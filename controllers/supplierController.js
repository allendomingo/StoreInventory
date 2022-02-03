const Suppliers = require('../models/supplier').model;
const contactController = require('./contactController');

exports.getSuppliers = function() {
	return Suppliers.find({}).populate('contacts');
};

exports.getSupplier = function(supplierId) {
	return Suppliers.findById(supplierId).populate('contacts');
};

exports.createSupplier = function(newSupplier) {
	const { contacts } = newSupplier;

	if (contacts.length === 0) {
		return Suppliers.create(newSupplier);
	}

	try {
		const parsedContacts = [];
		const contactNameFilters = contacts.map(({ name }) => ({ name }));

		return contactController.findContacts({ $or: contactNameFilters })
			.then((existingContacts) => {
				existingContacts.forEach(({ _id }) => parsedContacts.push(_id));

				const existingContactNames = existingContacts.map(({ name }) => name);
				const newContacts = contacts.filter(({ name }) => !existingContactNames.includes(name));

				if (newContacts.length === 0) {
					return null;
				}
				return contactController.createContacts(newContacts);
			})
			.then((newContacts) => {
				if (newContacts) {
					newContacts.forEach(({ _id }) => parsedContacts.push(_id));
				}

				return Suppliers.create({
					...newSupplier,
					contacts: parsedContacts,
				}).then((newSupplier) => {
					return Suppliers.findById(newSupplier._id).populate('contacts');
				});
			});
	} catch (e) {
		return Promise.reject(e);
	}
};

exports.updateSupplier = function(supplierId, updatedParams) {
	// TODO: Handle contact parsing

	return Suppliers.findByIdAndUpdate(
		supplierId,
		{ $set: updatedParams },
		{ new: true },
	).populate('contacts');
};

exports.deleteSuppliers = function() {
	return Suppliers.deleteMany({});
};

exports.deleteSupplier = function(supplierId) {
	return Suppliers.findByIdAndRemove(supplierId);
};
