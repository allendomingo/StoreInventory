const express = require('express');
const SupplierController = require('../controllers/supplierController');
const router = express.Router();

router.get('/', (_, res, next) => {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'GET suppliers listing'
   * #swagger.description = 'Get the whole list of suppliers'
   */
	SupplierController.getSuppliers()
		.then(suppliers => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(suppliers);
		})
		.catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'POST suppliers listing'
   * #swagger.description = 'Add a supplier.
	 	By default, this expects the contacts to be using their objectId's,
	  but the actual contact schema form can also be used.'
	 * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'Supplier object',
	 		schema: { $ref: '#/definitions/Supplier' }
	 }
   */
	SupplierController.createSupplier(req.body)
		.then(supplier => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(supplier);
		})
		.catch((err) => next(err));
});

router.delete('/', (_, res, next) => {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'DELETE suppliers listing'
   * #swagger.description = 'Delete all suppliers.
	 		Contacts will not be deleted.'
   */
	SupplierController.deleteSuppliers()
		.then(resp => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(resp);
		})
		.catch((err) => next(err));
});

router.get('/:supplierId', (req, res, next) => {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'GET specified supplier'
   * #swagger.description = 'Get a specified supplier based on id'
   */
	SupplierController.getSupplier(req.params.supplierId)
		.then(supplier => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(supplier);
		})
		.catch((err) => next(err));
});

router.put('/:supplierId', (req, res, next) => {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'PUT specified supplier'
   * #swagger.description = 'Update specified supplier with new values'
   * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'Supplier object',
	 		schema: { $ref: '#/definitions/Supplier' }
	 }
   */
	SupplierController.updateSupplier(req.params.supplierId, req.body)
		.then(updatedSupplier => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(updatedSupplier);
		})
		.catch((err) => next(err));
});

router.delete('/:supplierId', (req, res, next) => {
  /**
   * #swagger.tags = ['Suppliers']
   * #swagger.summary = 'DELETE specified supplier'
   * #swagger.description = 'DELETE a specified supplier based on id'
   */
	SupplierController.deleteSupplier(req.params.supplierId)
		.then(resp => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(resp);
		})
		.catch((err) => next(err));
});

module.exports = router;
