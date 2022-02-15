const ObjectId = require('mongodb').ObjectId;
const { Supplier } = require('../models').models;
const contactController = require('./contactController');

exports.getSuppliers = function(willPopulate = true) {
	const suppliers = Supplier.find({});

	if (willPopulate) {
		return suppliers.populate('contacts');
	}
	return suppliers;
};

exports.getSupplier = function(supplierId, willPopulate = true) {
	const supplier = Supplier.findById(supplierId);
	if (willPopulate) {
		return supplier.populate('contacts');
	}
	return supplier;
};

exports.findSupplier = function(filters) {
	return Supplier.findOne(filters);
};

exports.createSupplier = function(newSupplier, willPopulate = true) {
	const { contacts } = newSupplier;

	if (contacts.length === 0) {
		return Supplier.create(newSupplier);
	}

	// separate contact ids and contact objects
	const contactIds = [];
	const newContacts = [];
	
	contacts.forEach((contact) => {
		if (ObjectId.isValid(contact) && ObjectId(contact).toString() === contact) {
			contactIds.push(contact);
		} else { // assume contact object if not id
			newContacts.push(contact);
		}
	});
	
	return contactController.createContacts(newContacts)
		.then((newContactIds) => {
			const parsedContactIds = [
				...contactIds,
				...newContactIds,
			];
			return Supplier.create({
				...newSupplier,
				contacts: parsedContactIds,
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

exports.deleteSuppliers = function() {
	return Supplier.deleteMany({});
};

exports.deleteSupplier = function(supplierId) {
	return Supplier.findByIdAndRemove(supplierId);
};
