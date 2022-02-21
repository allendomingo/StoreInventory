const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', (req, res, next) => {
  /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'GET inventory listing'
   * #swagger.description = 'GET inventory listing'
   */
   inventoryController.getItems(req.query)
      .then(items => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(items);
      })
      .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
   /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'POST inventory item'
   * #swagger.description = 'Add an inventory item.'
	 * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'Inventory object',
	 		schema: { $ref: '#/definitions/Inventory' }
	 }
   */
	inventoryController.createItem(req.body)
		.then(item => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(item);
		})
		.catch((err) => next(err));
});

router.put('/', (_, res) => {
   /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'Operation forbidden'
   * #swagger.description = 'Operation forbidden'
   */

   res.statusCode = 403
   res.end('PUT operation not supported on /inventory')
});

router.delete('/', (_, res, next) => {
  /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'DELETE inventory items listing'
   * #swagger.description = 'Delete all inventory items.
   */
	inventoryController.deleteItems()
		.then(resp => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(resp);
		})
		.catch((err) => next(err));
});

router.get('/:itemId', (req, res, next) => {
  /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'GET specified inventory item'
   * #swagger.description = 'Get a specified inventory item based on id'
   */
	inventoryController.getItem(req.params.itemId)
		.then(item => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(item);
		})
		.catch((err) => next(err));
});

router.post('/:itemId', (req, res) => {
   /**
   * #swagger.tags = ['Inventory']
   * #swagger.summary = 'Operation forbidden'
   * #swagger.description = 'Operation forbidden'
   */
   res.statusCode = 403
   res.end(`POST operation not supported on /inventory/${req.params.itemId}`)
});

router.put('/:itemId', (req, res, next) => {
   /**
    * #swagger.tags = ['Inventory']
    * #swagger.summary = 'PUT specified inventory item'
    * #swagger.description = 'Update specified inventory item with new values'
    * #swagger.parameters['obj'] = {
           in: 'body',
           description: 'Inventory object',
           schema: { $ref: '#/definitions/Inventory' }
     }
    */
    inventoryController.updateItem(req.params.itemId, req.body)
       .then(updatedItem => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'applicaton/json');
          res.json(updatedItem);
       })
       .catch((err) => next(err));
 });

 router.delete('/:itemId', (req, res, next) => {
   /**
    * #swagger.tags = ['Inventory']
    * #swagger.summary = 'DELETE specified inventory item'
    * #swagger.description = 'Delete a specified inventory item based on id'
    */
    inventoryController.deleteItem(req.params.itemId)
       .then(resp => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'applicaton/json');
          res.json(resp);
       })
       .catch((err) => next(err));
 });

module.exports = router;
