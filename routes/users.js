var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var fs = require('fs');
const path = require('path');
const debug = require('debug')('worker:a');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.append('Link', ['http://www.baidu.com', 'http://sogou.com']);
  const secret = fs.readFileSync(path.join(__dirname , '../utils/secret.txt')).toString();
  // console.log('users.js secret:', secret);
  
  const signedCookie = cookieParser.signedCookie("bar", secret, {
    // path: req.path
  });

  // res.append('Set-Cookie', 'foo=bar');
  res.cookie("foo", signedCookie, {
    domain: 'ksnl.com',
    signed: true,
    
  })
  // console.log('res.get("content-type"):', res.get("Content-Type"))
  debug('booting %o', 'what else?')
  
  res.send('respond with a resource');
});

module.exports = router;
