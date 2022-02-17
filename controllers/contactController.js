const ObjectId = require('mongodb').ObjectId;
const { Contact } = require('../models').models;

exports.getContacts = function() {
	return Contact.find({}).populate('contacts');
};

exports.getContact = function(contactId) {
	return Contact.findById(contactId);
};

exports.findContacts = function(filters) {
	return Contact.find(filters);
};

// creates new contacts, and checks if that contact already exists
// does not update existing contacts if passed params are different
exports.createContacts = function(contacts) {
	if (!contacts || contacts.length === 0) {
		return Promise.resolve([]);
	}

	const parsedContacts = [];

	// need to check if contact/s already exist
	const contactNameFilters = contacts.map(({ name }) => ({ name }));
	return this.findContacts({ $or: contactNameFilters })
		.then((existingContacts) => {
			existingContacts.forEach(({ _id }) => parsedContacts.push(_id));

			const existingContactNames = existingContacts.map(({ name }) => name);
			const newContacts = contacts.filter(({ name }) => !existingContactNames.includes(name));

			if (newContacts.length === 0) {
				return Promise.resolve(null);
			}
			return Contact.create(newContacts);
		})
		.then((newContacts) => {
			if (newContacts) {
				newContacts.forEach(({ _id }) => parsedContacts.push(_id));
			}
			return Promise.resolve(parsedContacts);
		});
};

exports.createContact = function(contact) {
	return Contact.create(contact);
};

exports.updateContact = function(contactId, updateParams) {
	return Contact.findByIdAndUpdate(
		contactId,
		{ $set: updateParams },
		{ new: true },
	);
};

exports.deleteContacts = function() {
	return Contact.deleteMany({});
};

exports.deleteContact = function(contactId) {
	return Contact.findByIdAndRemove(contactId);
};

exports.separateContacts = function(contacts) {
	// separate contact ids and  objects
	const contactIds = [];
	const newContactObjects = [];
	
	contacts.forEach((contact) => {
		if (ObjectId.isValid(contact) && ObjectId(contact).toString() === contact) {
			contactIds.push(contact);
		} else { // assume contact object if not id
			newContactObjects.push(contact);
		}
	});

	// check if contact id's exist
	const parsedContactIds = this.findContacts({
		$or: contactIds.map(_id => ({ _id }))
	}).then((existingContacts) => {
		const existingContactIds = existingContacts.map(({ _id }) => _id.toString());

		// check if all contact ids were found
		if (existingContactIds.length !== contactIds.length) {
			const missingContactIds = contactIds.filter(id => !existingContactIds.includes(id));
			return Promise.reject(
				`Contacts with the following ids were not found: ${missingContactIds.join(', ')}`
			);
		}

		return Promise.resolve(existingContactIds);
	})

	// create new contacts
	const newContacts = this.createContacts(newContactObjects);

	return Promise.all([parsedContactIds, newContacts]);
}
