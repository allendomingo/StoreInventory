const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Methods = Object.freeze({
	cash: 'Cash',
	gCash: 'GCash',
	check: 'Check',
	bankTransfer: 'Bank bankTransfer',
	etc: 'etc',
});

// Sample purchase order transaction, pending for manager's approval
const transactionDefinition = {
	$status: Statuses.pendingApproval,
	$date: '2022-01-26',
	$buyer: { $ref: '#/definitions/Customer' },
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
	discount: 0,
	$finalAmount: 15607.80,
	withholdingTax: null,
	paymentAmount: null,
	paymentMethod: null,
	remarks: 'Need to replace broken mouse',
};

// Sample 
const transactionInputDTODefinition = {
	$status: Statuses.pendingDelivery,
	$date: '2022-02-10',
	$buyer: 'Customer ObjectId',
	$seller: 'Supplier ObjectId',
	$type: Types.purchase,
	$secondaryType: 'PO',
	$number: 1337,
	$rows: [{
		$itemId: 'Inventory ObjectId',
		$unitPrice: 8671,
		$quantity: 2,
		discount: 10,
	}],
	discount: 0,
	withholdingTax: null,
	paymentAmount: null,
	paymentMethod: null,
	remarks: 'Need to replace broken mouse',
};

const transactionRowSchema = new Schema({
	itemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
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
	rowAmount: {
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
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
	},
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Supplier',
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
	finalAmount: {
		type: Number,
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
		enum: Object.values(Methods),
		default: Methods.cash,
	},
	remarks: {
		type: String,
		default: '',
	},
},{
		timestamps: true,
})

Object.assign(transactionSchema.statics, {
	Statuses, Types, Methods,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
	model: Transaction,
	definition: transactionDefinition,
	transactionInputDTO: transactionInputDTODefinition,
};
