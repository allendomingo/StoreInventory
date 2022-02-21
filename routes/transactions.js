const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.get('/', function(_, res, next) {
  /**
   * #swagger.tags = ['Transactions']
   * #swagger.summary = 'GET transactions listing'
   * #swagger.description = 'GET transactions listing'
   */
	transactionController.getTransactions()
		.then(transactions => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(transactions);
		})
		.catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  /**
   * #swagger.tags = ['Transactions']
   * #swagger.summary = 'POST transaction'
   * #swagger.description = 'Add a transaction.
		When transaction is a purchase, seller should not be null.
		When transaction is a sale, buyer should not be null.
	 	By default, this expects the buyer/seller to be using objectId's,
	  but the actual customer/supplier schemas respectively can also be used.'
	 * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'Transaction object',
	 		schema: { $ref: '#/definitions/TransactionInputDTO' }
	 }
   */
	transactionController.createTransaction(req.body)
		.then(transaction => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(transaction);
		})
		.catch((err) => next(err));
});

router.get('/:transactionId', (req, res, next) => {
  /**
   * #swagger.tags = ['Transactions']
   * #swagger.summary = 'GET specified transaction'
   * #swagger.description = 'Get a specified transaction based on id'
   */
	transactionController.getTransaction(req.params.transactionId)
		.then(transaction => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(transaction);
		})
		.catch((err) => next(err));
});

router.put('/:transactionId', (req, res, next) => {
  /**
   * #swagger.tags = ['Transactions']
   * #swagger.summary = 'PUT specified transaction'
   * #swagger.description = 'Update specified supplier with new values'
   * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'Transaction object',
	 		schema: { $ref: '#/definitions/TransactionInputDTO' }
	 }
   */
	transactionController.updateTransaction(req.params.transactionId, req.body)
		.then(updatedTransaction => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'applicaton/json');
			res.json(updatedTransaction);
		})
		.catch((err) => next(err));
});

module.exports = router;
