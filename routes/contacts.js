const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.get('/', (_, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'GET contacts listing'
    #swagger.description = 'Get the whole list of contacts'
  */
  contactController.getContacts()
    .then((contacts) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(contacts);
    })
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'POST contact'
    #swagger.description = 'Add a contact.
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Contact object',
      schema: { $ref: '#/definitions/Contact' }
    }
  */
  contactController.createContact(req.body)
    .then((contact) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(contact);
    })
    .catch((err) => next(err));
});

router.put('/', (_, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'PUT contact items'
    #swagger.description = 'Operation forbidden'
  */
  res.statusCode = 403;
  res.end('PUT operation not supported on /contacts');
});

router.delete('/', (_, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'DELETE contacts listing'
    #swagger.description = 'Delete all contacts.
  */
  contactController.deleteContacts()
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(resp);
    })
    .catch((err) => next(err));
});

router.get('/:contactId', (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'GET specified contact'
    #swagger.description = 'Get a specified contact based on id'
  */
  contactController.getContact(req.params.contactId)
    .then((contact) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(contact);
    })
    .catch((err) => next(err));
});

router.post('/:contactId', (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'POST specified contact'
    #swagger.description = 'Operation forbidden'
  */
  res.statusCode = 403;
  res.end(`POST operation not supported on /contact/${req.params.contactId}`);
});

router.put('/:contactId', (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'PUT specified contact'
    #swagger.description = 'Update specified contact with new values'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: 'Contact object',
      schema: { $ref: '#/definitions/Contact' }
    }
  */
    

  const testFailEsLint = 0
  contactController.updateContact(req.params.contactId, req.body)
    .then((updatedContact) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(updatedContact);
    })
    .catch((err) => next(err));
});

router.delete('/:contactId', (req, res, next) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'DELETE specified contact'
    #swagger.description = 'Delete a specified contact based on id'
  */
  contactController.deleteContact(req.params.contactId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(resp);
    })
    .catch((err) => next(err));
});

module.exports = router;
