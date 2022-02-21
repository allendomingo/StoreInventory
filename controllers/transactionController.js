const ObjectId = require('mongodb').ObjectId;
const { Transaction } = require('../models').models;
const { Statuses, Types } = Transaction;
const supplierController = require('./supplierController');

exports.getTransactions = function() {
	return Transaction.find({})
		.populate('buyer')
		.populate('seller')
		.populate('rows.itemId');
};

exports.getTransaction = function(transactionId) {
	return Transaction.findById(transactionId)
		.populate('buyer')
		.populate('seller')
		.populate('rows.itemId');
};

exports.createTransaction = function(transactionInput) {
	const {
		status,
		type,
		buyer = null,
		seller = null,
		rows,
	} = transactionInput;

	// Validate status, type, and other inputs
	if (status === Statuses.incompletePayment && !transactionInput.remarks) {
		return Promise.reject('Need to specify reason for incomplete payment in remarks');
	} else if (status === Statuses.paid && (!transactionInput.paymentAmount || !transactionInput.paymentMethod)) {
		return Promise.reject('Paid transactions require both the amount paid and the transaction method');
	} else if (status === Statuses.cancelled && !transactionInput.remarks) {
		return Promise.reject('Need to specify reason for cancellation in remarks');
	}

	// Compute subtotal amount per row and the total amount
	const parsedRows = rows.map((row) => {
		const { unitPrice, quantity, discount = 0 } = row;
		const subTotalAmount = unitPrice * quantity;
		const discountedAmount = subTotalAmount * (100 - discount) / 100;
		return {
			...row,
			subTotalAmount,
			discountedAmount,
		};
	});
	const totalAmount = parsedRows.reduce((acc, row) => acc + row.discountedAmount, 0);

	// TODO: Check if transaction is paid and the amount is correct

	// Update transaction object with computed amounts
	const newTransaction = {
		...transactionInput,
		rows: parsedRows,
		totalAmount,
	};

	// Handle transactions where the user is the buyer
	if ([Types.purchase, Types.loan].includes(type)) {
		if (seller === null) {
			// seller cannot be null in purchases and loans
			return Promise.reject(`Seller cannot be null with transaction type ${type}`);
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
			})		
		}

		return supplier.then((finalSeller) => {
			if (finalSeller === null) {
				// seller cannot be null in purchases and loans
				return Promise.reject(`Seller is invalid.missing. Needs valid seller for transaction type ${type}`);
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

	return Promise.reject(`Transaction type ${type} is invalid`);
};
