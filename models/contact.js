const mongoose = require('mongoose');
const { CONTACTTYPES } = require('../constants/contactTypes.js')
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
  contactType: {
    type: String,
    required: true,
    enum: Object.values(CONTACTTYPES),
  }
},{
    timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
	model: Contact,
	definition: contactDefinition,
};
