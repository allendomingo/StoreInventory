const router = require('express').Router();

/* GET home page. */
router.get('/', (_, res) => {
  /*
    #swagger.tags = ['/']
    #swagger.summary = 'GET home page'
    #swagger.description = 'GET home page'
  */
  res.render('index', { title: 'Express' });
});

module.exports = router;
