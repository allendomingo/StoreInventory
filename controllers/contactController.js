const Contacts = require('../models/contact').model;

exports.createContacts = function(newContacts) {
	return Contacts.create(newContacts);
};

exports.findContacts = function(filters) {
	return Contacts.find(filters);
};