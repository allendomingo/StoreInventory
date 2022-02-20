const Inventory = require('../models/inventory').model;

exports.getItems = function(params) {
	return Inventory.find(params);
};

exports.getItem = function(itemId) {
	return Inventory.findById(itemId);
};

exports.createItem = function(item) {
	return Inventory.create(item);
};

exports.deleteItems = function() {
	return Inventory.deleteMany({});
};

exports.updateItem = function(itemId, updateParams) {
	return Inventory.findByIdAndUpdate(
		itemId,
		{ $set: updateParams },
		{ new: true },
	);
};

exports.deleteItem = function(itemId) {
	return Inventory.findByIdAndRemove(itemId);
};
