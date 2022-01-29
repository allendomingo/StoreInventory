const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactDefinition = {
	$name: 'Juan dela Cruz',
	numbers: ['0900XXXXXXX'],
	emails: ['juandelacruz@email.com'],
	$contactType: 'customer',
};

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  numbers: {
    type: [String],
  },
  emails: {
    type: [String],
  },
},{
    timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
	model: Contact,
	definition: contactDefinition,
};
