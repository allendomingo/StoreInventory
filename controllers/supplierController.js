const { Supplier } = require('../models').models;
const contactController = require('./contactController');

exports.getSuppliers = function getSuppliers(willPopulate = true) {
  const suppliers = Supplier.find({});

  if (willPopulate) {
    return suppliers.populate('contacts');
  }
  return suppliers;
};

exports.getSupplier = function getSupplier(supplierId, willPopulate = true) {
  const supplier = Supplier.findById(supplierId);
  if (willPopulate) {
    return supplier.populate('contacts');
  }
  return supplier;
};

exports.findSupplier = function findSupplier(filters) {
  return Supplier.findOne(filters);
};

exports.createSupplier = function createSupplier(newSupplier, willPopulate = true) {
  const { contacts } = newSupplier;

  if (contacts.length === 0) {
    return Supplier.create(newSupplier);
  }

  return contactController.separateContacts(contacts)
    .then(([existingContactIds, newContactIds]) => {
      const parsedContactIds = [
        ...existingContactIds,
        ...newContactIds,
      ];
      return Supplier.create({
        ...newSupplier,
        contacts: parsedContactIds,
      }).then((createdSupplier) => this.getSupplier(createdSupplier._id, willPopulate));
    });
};

exports.updateSupplier = function updateSupplier(supplierId, updateParams, willPopulate = true) {
  if (updateParams.contacts && updateParams.contacts.length > 0) {
    return contactController.separateContacts(updateParams.contacts)
      .then(([existingContactIds, newContactIds]) => {
        const parsedUpdateParams = {
          ...updateParams,
          contacts: [
            ...existingContactIds,
            ...newContactIds,
          ],
        };
        const updatedSupplier = Supplier.findByIdAndUpdate(
          supplierId,
          { $set: parsedUpdateParams },
          { new: true },
        );

        if (willPopulate) {
          return updatedSupplier.populate('contacts');
        }
        return updatedSupplier;
      });
  }

  const updatedSupplier = Supplier.findByIdAndUpdate(
    supplierId,
    { $set: updateParams },
    { new: true },
  );

  if (willPopulate) {
    return updatedSupplier.populate('contacts');
  }
  return updatedSupplier;
};

exports.deleteSuppliers = function deleteSuppliers() {
  return Supplier.deleteMany({});
};

exports.deleteSupplier = function deleteSupplier(supplierId) {
  return Supplier.findByIdAndRemove(supplierId);
};
