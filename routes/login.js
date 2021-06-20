var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const cookies = req.cookies;
  res.redirect('/mainframe')
});

module.exports = router;
