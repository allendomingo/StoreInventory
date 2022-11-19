import { model, Schema } from 'mongoose';

enum ContactType {
  supplier = 'Supplier',
  customer = 'Customer'
}

const contactDefinition = {
  $name: 'Juan dela Cruz',
  numbers: ['0900XXXXXXX'],
  emails: ['juandelacruz@email.com'],
  $contactType: [ContactType.customer]
};

interface IContact {
  name: string;
  numbers: [string];
  emails: [string];
  contactType: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    numbers: {
      type: [String]
    },
    emails: {
      type: [String]
    },
    contactType: {
      type: String,
      enum: Object.values(ContactType),
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Contact = model('Contact', contactSchema);

export { Contact, contactDefinition };

export default Contact;
