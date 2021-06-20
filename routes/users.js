var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var fs = require('fs');
const path = require('path');
const a = require('debug')('worker:a'),
  b = require('debug')('worker:b');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.append('Link', ['http://www.baidu.com', 'http://sogou.com']);
  const secret = fs.readFileSync(path.join(__dirname , '../utils/secret.txt')).toString();
  // console.log('users.js secret:', secret);
  console.log('req.cookie', req.cookies)
  
  const signedCookie = cookieParser.signedCookie("bar", secret, {
    // path: req.path
  });

  // res.append('Set-Cookie', 'foo=bar');
  res.cookie("foo", signedCookie, {
    domain: 'ksnl.com',
    signed: true,
    
  })
  // console.log('res.get("content-type"):', res.get("Content-Type"))
  a('booting %o', 'what else?')
  b('booting %o', 'how about me?')
  // res.setHeader("Set-Cookie", JSON.stringify({
  //   user: 'kevinjang'
  // }))

  res.cookie("username", "kevinjang", {
    domain: 'localhost:*',
    secure: true,
    signed: true
  })

  // console.log(cookieParser(res.cookie('username')))

  console.log(res.cookie)
  res.send('respond with a resource');
});

module.exports = router;
