const Suppliers = require('../models/supplier').model;
const contactController = require('./contactController');

exports.getSuppliers = function(willPopulate = true) {
	const suppliers = Suppliers.find({});

	if (willPopulate) {
		return suppliers.populate('contacts');
	}
	return suppliers;
};

exports.getSupplier = function(supplierId, willPopulate = true) {
	const supplier = Suppliers.findById(supplierId);
	if (willPopulate) {
		return supplier.populate('contacts');
	}
	return supplier;
};

exports.createSupplier = function(newSupplier, willPopulate = true) {
	const { contacts } = newSupplier;

	if (contacts.length === 0) {
		return Suppliers.create(newSupplier);
	}

	return contactController.createContacts(contacts)
		.then((parsedContacts) => {
			return Suppliers.create({
				...newSupplier,
				contacts: parsedContacts,
		}).then((newSupplier) => {
			return this.getSupplier(newSupplier._id, willPopulate);
		});
	});
};

exports.updateSupplier = function(supplierId, updateParams, willPopulate = true) {
	if (updateParams.contacts && updateParams.contacts.length > 0) {
		return contactController.createContacts(updateParams.contacts)
			.then((parsedContacts) => {
				const parsedUpdateParams = {
					...updateParams,
					contacts: parsedContacts,
				};
				const updatedSupplier = Suppliers.findByIdAndUpdate(
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

	const updatedSupplier = Suppliers.findByIdAndUpdate(
		supplierId,
		{ $set: updateParams },
		{ new: true },
	);
	
	if (willPopulate) {
		return updatedSupplier.populate('contacts');
	}
	return updatedSupplier;
};

exports.deleteSuppliers = function() {
	return Suppliers.deleteMany({});
};

exports.deleteSupplier = function(supplierId) {
	return Suppliers.findByIdAndRemove(supplierId);
};
