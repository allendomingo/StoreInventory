const router = require('express').Router();
const contactController = require('../controllers/contactController');

router.get('/', (_, res, next) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.summary = 'GET contacts listing'
   * #swagger.description = 'Get the whole list of contacts'
   */
	contactController.getContacts()
		.then(contacts => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(contacts);
		})
		.catch((err) => next(err));
});

router.get('/:contactId', (req, res, next) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.summary = 'GET specified contact'
   * #swagger.description = 'Get a specified contact based on id'
   */
	contactController.getSupplier(req.params.contactId)
		.then(contact => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(contact);
		})
		.catch((err) => next(err));
});
