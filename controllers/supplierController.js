const Suppliers = require('../models/supplier').model;
const contactController = require('./contactController');

exports.getSuppliers = function () {
  return Suppliers.find({}).populate('contacts');
};

exports.getSupplier = function (supplierId) {
  return Suppliers.findById(supplierId).populate('contacts');
};

exports.createSupplier = function (newSupplier) {
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

exports.updateSupplier = function (supplierId, updateParams) {
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

exports.deleteSuppliers = function () {
  return Suppliers.deleteMany({});
};

exports.deleteSupplier = function (supplierId) {
  return Suppliers.findByIdAndRemove(supplierId);
};
