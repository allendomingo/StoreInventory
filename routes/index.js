var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  /**
   * #swagger.tags = ['/']
   * #swagger.summary = 'GET home page'
   * #swagger.description = 'GET home page'
   */
  res.render('index', { title: 'Express' });
});

module.exports = router;
