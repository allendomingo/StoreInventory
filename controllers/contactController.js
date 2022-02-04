const Contacts = require('../models/contact').model;

exports.findContacts = function(filters) {
	return Contacts.find(filters);
};

// creates new contacts, and checks if that contact already exists
// does not update existing contacts if passed contact is different
exports.createContacts = function(contacts) {
	if (!contacts || contacts.length === 0) {
		return Promise.resolve([]);
	}

	// need to check if contact/s already exist
	const parsedContacts = [];
	const contactNameFilters = contacts.map(({ name }) => ({ name }));

	return this.findContacts({ $or: contactNameFilters })
		.then((existingContacts) => {
			existingContacts.forEach(({ _id }) => parsedContacts.push(_id));

			const existingContactNames = existingContacts.map(({ name }) => name);
			const newContacts = contacts.filter(({ name }) => !existingContactNames.includes(name));

			if (newContacts.length === 0) {
				return Promise.resolve(null);
			}
			return Contacts.create(newContacts);
		})
		.then((newContacts) => {
			if (newContacts) {
				newContacts.forEach(({ _id }) => parsedContacts.push(_id));
			}
			return Promise.resolve(parsedContacts);
		});
};