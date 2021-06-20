const express = require('express');
const router = express.Router();
const crypto = require('crypto-js');
const {SHA256} = crypto

router.get('/', function(req,res, next){
    console.log(SHA256("message"));
    const message =    crypto.AES.encrypt( Buffer.from("message").toString("base64"), req.secret).toString();
    res.send('crypto-js,' + message);
})

module.exports = router;