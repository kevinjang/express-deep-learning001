var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const cookies = req.cookies;
  res.render('login');
});

module.exports = router;
