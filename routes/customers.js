var express = require('express');
var router = express.Router();

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
 *     Customer:
 *       allOf:
 *         - type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The customer's name.
 *             address:
 *               type: Array<string>
 *               description: The customer's address/es.
 *             contacts:
 *               type: Contact
 *               description: The customer's contact information
 *             brands:
 *               type: [string]
 *               description: The customer's address/es.
 *             notes:
 *               type: string
 *               description: Additional notes.
 */

/* GET customers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;