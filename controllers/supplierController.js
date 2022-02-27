const Suppliers = require('../models/supplier').model;
const contactController = require('./contactController');

exports.getSuppliers = function getSuppliers() {
  return Suppliers.find({}).populate('contacts');
};

exports.getSupplier = function getSupplier(supplierId) {
  return Suppliers.findById(supplierId).populate('contacts');
};

exports.createSupplier = function createSupplier(newSupplier) {
  const { contacts } = newSupplier;

  if (contacts.length === 0) {
    return Suppliers.create(newSupplier);
  }

  return contactController.createContacts(contacts)
    .then((parsedContacts) => (
      Suppliers.create({
        ...newSupplier,
        contacts: parsedContacts,
      }).then((createdSupplier) => (
        Suppliers.findById(createdSupplier._id).populate('contacts')
      ))
    ));
};

exports.updateSupplier = function updateSupplier(supplierId, updateParams) {
  if (updateParams.contacts && updateParams.contacts.length > 0) {
    return contactController.createContacts(updateParams.contacts)
      .then((parsedContacts) => {
        const parsedUpdateParams = {
          ...updateParams,
          contacts: parsedContacts,
        };
        return Suppliers.findByIdAndUpdate(
          supplierId,
          { $set: parsedUpdateParams },
          { new: true },
        ).populate('contacts');
      });
  }

  return Suppliers.findByIdAndUpdate(
    supplierId,
    { $set: updateParams },
    { new: true },
  ).populate('contacts');
};

exports.deleteSuppliers = function deleteSuppliers() {
  return Suppliers.deleteMany({});
};

exports.deleteSupplier = function deleteSupplier(supplierId) {
  return Suppliers.findByIdAndRemove(supplierId);
};
