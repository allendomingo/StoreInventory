const { Schema, model } = require('mongoose');

const Statuses = Object.freeze({
  pendingApproval: 'Pending Approval',
  pendingDelivery: 'Pending Delivery',
  delivered: 'Delivered',
  incompletePayment: 'Incomplete Payment',
  paid: 'Paid',
  cancelled: 'Cancelled',
});

const Types = Object.freeze({
  purchase: 'Purchase',
  sale: 'Sale',
  debt: 'Debt',
  loan: 'Loan',
});

// Sample purchase order transaction, pending for manager's approval
const transactionDefinition = {
  $status: Statuses.pendingApproval,
  $date: '2022-01-26',
  $buyer: '<Insert Name of your company here>',
  $seller: { $ref: '#/definitions/Supplier' },
  $type: Types.purchase,
  $secondaryType: 'PO',
  $number: 1337,
  $rows: [{
    $itemId: { $ref: '#/definitions/InventoryItem' },
    $unitPrice: 8671,
    $quantity: 2,
    $subTotalAmount: 17342,
    discount: 10,
    $discountedAmount: 15607.80,
  }],
  $totalAmount: 15607.80,
  remarks: 'Need to replace broken mouse',
};

const transactionRowSchema = new Schema({
  itemId: {
    type: String, // TODO: Update to use inventory item object id
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subTotalAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  discountedAmount: { // effectively the final amount for the row
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    default: '',
  },
});

const transactionSchema = new Schema({
  status: {
    type: String,
    enum: Object.values(Statuses),
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(Types),
    required: true,
  },
  secondaryType: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  rows: [transactionRowSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  paymentAmount: {
    type: Number,
  },
  withholdingTax: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: String,
    default: 'Cash',
  },
  remarks: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

Object.assign(transactionSchema.statics, {
  Statuses, Types,
});

const Transaction = model('Transaction', transactionSchema);

module.exports = {
  model: Transaction,
  definition: transactionDefinition,
};
