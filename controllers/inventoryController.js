const Inventory = require('../models/inventory').model;

exports.getItems = function getItems(params) {
  return Inventory.find(params);
};

exports.getItem = function getItem(itemId) {
  return Inventory.findById(itemId);
};

exports.createItem = function createItem(item) {
  return Inventory.create(item);
};

exports.deleteItems = function deleteItems() {
  return Inventory.deleteMany({});
};

exports.updateItem = function updateItem(itemId, updateParams) {
  return Inventory.findByIdAndUpdate(
    itemId,
    { $set: updateParams },
    { new: true },
  );
};

exports.deleteItem = function deleteItem(itemId) {
  return Inventory.findByIdAndRemove(itemId);
};
