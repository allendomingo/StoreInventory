var express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');

const userController = require('../controllers/userController');

const { ROLES } = require('../constants/roles');

var router = express.Router();

router.use(bodyParser.json());

// NOTE: Better to test this on postman. Swagger is just for documentation (might not be authenticated)

router.get('/', cors.corsWithOption, authenticate.verifyUser, authenticate.verifyRoles([ROLES.manager, ROLES.admin]), function(req, res, next) {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = 'GET users listing'
   * #swagger.description = 'GET users listing'
   */

  userController.getUsers(req.query)
  .then(users => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, err => next(err))
  .catch(err => next(err));
});

router.post('/', (_, res) => {
   /**
 * #swagger.tags = ['User']
 * #swagger.summary = 'POST users'
 */

  res.statusCode = 403;
  res.end('POST operation not supported on /users');
});

router.put('/', (_, res) => {
   /**
 * #swagger.tags = ['User']
 * #swagger.summary = 'PUT users'
 */

  res.statusCode = 403;
  res.end('PUT operation not supported on /users');
});

router.delete('/',  authenticate.verifyUser, authenticate.verifyRoles([ROLES.manager, ROLES.admin]), (req, res, next) => {
  /**
 * #swagger.tags = ['User']
 * #swagger.summary = 'DELETE users'
 * #swagger.description = 'Delete users'.
 */
  userController.deleteUsers(req.body.ids)
    .then(resp => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'applicaton/json');
      res.json(resp);
    })
    .catch((err) => next(err));
});

/*=====================================================================================================*/ 

router.get('/signup', cors.corsWithOption, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'GET signup'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('GET operation not supported on /users/signup');
});

router.post('/signup', cors.corsWithOption, function(req, res) {
  /**
 * #swagger.tags = ['User']
 * #swagger.summary = 'POST signup user'
 * #swagger.description = 'Signup a user'
 * #swagger.parameters['obj'] = {
    in: 'body',
    description: 'User object',
    schema: { $ref: '#/definitions/User' }
  }
  */
  userController.registerUser(req, res);
});

router.put('/signup', cors.corsWithOption, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'PUT signup'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('PUT operation not supported on /users/signup');
});

router.delete('/signup', cors.corsWithOption, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'DELETE signup'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('DELETE operation not supported on /users/signup');
});

/*=====================================================================================================*/ 

router.get('/login', cors.corsWithOption, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'GET login'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('GET operation not supported on /users/login');
});

router.post('/login', cors.corsWithOption, (req, res, next) => {
  /**
 * #swagger.tags = ['User']
 * #swagger.summary = 'POST login user'
 * #swagger.description = 'Login a user'
 * #swagger.parameters['obj'] = {
    in: 'body',
    description: 'User object',
    schema: { $ref: '#/definitions/User' }
  }
  */
  userController.loginUser(req, res, next);
});

router.put('/login', cors.corsWithOption, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'PUT login'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('PUT operation not supported on /users/login');
});

router.delete('/login', cors.corsWithOption, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'DELETE login'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('DELETE operation not supported on /users/login');
});

/*=====================================================================================================*/ 

router.get('/:userId', cors.corsWithOption, authenticate.verifyUser, authenticate.verifyRoles([ROLES.manager, ROLES.admin]), function(req, res, next) {
   /**
   * #swagger.tags = ['User']
   * #swagger.summary = 'POST user item'
   * #swagger.description = 'GET specific user details'
	 * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'User object',
	 		schema: { $ref: '#/definitions/User' }
	 }
   */
  userController.getUser(req.params.userId)
    .then(user => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, err => next(err))
    .catch(err => next(err));
});

router.post('/:userId', cors.corsWithOption, authenticate.verifyUser, function(req, res) {
  /**
  * #swagger.tags = ['User']
  * #swagger.summary = 'POST user'
  * #swagger.description = 'Forbidden'.
  */
  res.statusCode = 403;
  res.end('POST operation not supported on /users/:userId');
});

router.put('/:userId', cors.corsWithOption, authenticate.verifyUser, authenticate.verifyRoles([ROLES.manager, ROLES.admin]), function(req, res, next) {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = 'PUT user'
   * #swagger.description = 'Update specific user details'
	 * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'User object',
	 		schema: { $ref: '#/definitions/User' }
	 }
   */
  userController.updateUser(req.params.userId, req.body)
    .then(user => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, err => next(err))
    .catch(err => next(err));
});

router.delete('/:userId', cors.corsWithOption, authenticate.verifyUser, authenticate.verifyRoles([ROLES.admin]), function(req, res, next) {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = 'DELETE user'
   * #swagger.description = 'DELETE specific user details'
	 * #swagger.parameters['obj'] = {
	 		in: 'body',
	 		description: 'User object',
	 		schema: { $ref: '#/definitions/User' }
	 }
   */
  userController.deleteUser(req.params.userId)
    .then(user => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, err => next(err))
    .catch(err => next(err));
});


module.exports = router;
