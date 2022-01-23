const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The contact person's name.
 *         numbers:
 *           type: Array<string>
 *           description: The contact person's phone number/s.
 *         emails:
 *           type: Array<string>
 *           description: The contact person's email/s.
 *         contactType:
 *           type: string
 *           description: Whether the contact is a customer or a supplier
 */

const contactSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  numbers: {
    type: [String],
    required: true
  },
  emails: {
    type: [String],
    required: true
  },
  // Differentiate between supplier, customer, etc.
  contactType: {
    type: String,
    required: true
  }
},{
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact