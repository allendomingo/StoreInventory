const { ObjectId } = require('mongodb');
const { Transaction } = require('../models').models;

const { Statuses, Types } = Transaction;
const supplierController = require('./supplierController');
const inventoryController = require('./inventoryController');

exports.getTransactions = function getTransactions() {
  return Transaction.find({})
    .populate('buyer')
    .populate('seller')
    .populate('rows.itemId');
};

exports.getTransaction = function getTransaction(transactionId) {
  return Transaction.findById(transactionId)
    .populate('buyer')
    .populate('seller')
    .populate('rows.itemId');
};

exports.createTransaction = async function createTransaction(transactionInput) {
  const {
    status, type,
    // buyer = null,
    seller = null,
    rows,
    discount = 0,
    paymentAmount, paymentMethod,
    remarks,
  } = transactionInput;

  // Validate status, type, and other inputs
  if (status === Statuses.incompletePayment && !transactionInput.remarks) {
    return Promise.reject(new Error('Need to specify reason for incomplete payment in remarks'));
  }
  if (status === Statuses.paid
    && (!transactionInput.paymentAmount || !transactionInput.paymentMethod)
  ) {
    return Promise.reject(new Error('Paid transactions require both the amount paid and the transaction method'));
  }
  if (status === Statuses.cancelled && !transactionInput.remarks) {
    return Promise.reject(new Error('Need to specify reason for cancellation in remarks'));
  }

  // Check if item object ids passed are valid and exist
  const itemIdFilters = rows.map(({ itemId }) => ({ itemId }));
  const items = await inventoryController.findItems({ $or: itemIdFilters });

  if (items.length < itemIdFilters.length) {
    const existingItemIds = items.map(({ itemId }) => itemId);
    const nonexistentIds = itemIdFilters.filter(({ itemId }) => !existingItemIds.includes(itemId));
    return Promise.reject(new Error(`Item Ids not found: ${nonexistentIds.join(' ')}`));
  }

  if (rows.any((row, i) => row.unitPrice !== items[i].srp && !row.remarks)) {
    return Promise.reject(new Error('Missing remarks for item/s with different price/s from the SRP'));
  }

  // Compute subtotal amount per row and the total amount
  const parsedRows = rows.map((row) => {
    const { unitPrice, quantity, discount: rowDiscount = 0 } = row;
    const subTotalAmount = unitPrice * quantity;
    const discountedAmount = subTotalAmount * ((100 - rowDiscount) / 100);
    return {
      ...row,
      subTotalAmount,
      discountedAmount,
    };
  });
  const totalAmount = parsedRows.reduce((acc, row) => acc + row.discountedAmount, 0);
  const finalAmount = totalAmount * ((100 - discount) / 100);

  // Check if transaction is paid and the amount is correct
  if (status === Statuses.paid) {
    if (!paymentAmount) {
      return Promise.reject(new Error('Missing payment amount for paid transaction'));
    }
    if (!paymentMethod) {
      return Promise.reject(new Error('Missing payment method for paid transaction'));
    }
    if ((paymentAmount !== finalAmount) && !remarks) {
      return Promise.reject(new Error('Amount paid is different from expected. Need remarks if valid.'));
    }
  }

  // Update transaction object with computed amounts
  const newTransaction = {
    ...transactionInput,
    rows: parsedRows,
    totalAmount,
    finalAmount,
  };

  // Handle transactions where the user is the buyer
  if ([Types.purchase, Types.loan].includes(type)) {
    if (seller === null) {
      // seller cannot be null in purchases and loans
      return Promise.reject(new Error(`Seller cannot be null with transaction type ${type}`));
    }

    let supplier = Promise.resolve(seller);

    // check if seller is a valid id
    if (ObjectId(seller).toString() === seller) {
      supplier = supplierController.getSupplier(seller, false);
    } else {
      // no id provided, check if provided supplier already exists
      supplier = supplierController.findSupplier({
        name: seller.name,
      }).then((existingSupplier) => {
        if (existingSupplier !== null) {
          return Promise.resolve(existingSupplier);
        }

        // create supplier if no matches found
        return supplierController.createSupplier(seller, false);
      });
    }

    return supplier.then((finalSeller) => {
      if (finalSeller === null) {
        // seller cannot be null in purchases and loans
        return Promise.reject(new Error(`Seller is invalid.missing. Needs valid seller for transaction type ${type}`));
      }

      return Transaction.create({
        ...newTransaction,
        seller: finalSeller._id,
        buyer: null, // buyer is ignored, and assumed to be the retailer for loans and purchases
      });
    });
  }

  // TODO: handle sale and debt transactions (requires Customer model)
  if ([Types.sale, Types.debt].includes(type)) {
    return Promise.resolve(null);
  }

  return Promise.reject(new Error(`Transaction type ${type} is invalid`));
};

exports.deleteTransactions = function deleteTransactions() {
  return Transaction.deleteMany({});
};

exports.deleteTransaction = function deleteTransaction(transactionId) {
  return Transaction.findByIdAndRemove(transactionId);
};
