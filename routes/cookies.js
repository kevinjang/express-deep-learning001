const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
// const fs = require('fs');
// const path = require('path');
// const secret = fs.readFileSync(path.join(__dirname, '../utils/secret.txt')).toString();
// const encrypt = require('encrypt');
// const enc = require('encrypt-me').additionalCipher;
const cryptos = require('cryptos');

router.get('/', (req, res, next)=>{
    // const {secret} = req;
    const secret = 'abcdefghijklmnopqrstuvwxyz';
    const signedCookie = cookieParser.signedCookie(JSON.stringify({
        name: 'kevinjang',
        age: 18,
        gender: 'male'
    }), secret)
    const cookie = Buffer.from(JSON.stringify({
        name: 'kevinjang',
        age: 18,
        gender: 'male'
    })).toString('base64')
    // console.log('secret:', secret)
    // console.log('encrypt-me:', enc)
    
    // const cok = cryptos.cipher(cookie, secret); //enc.encrypt(cookie, secret);
    console.log('signedCookie:', cookie)
    res.cookie("userinfo", cookie)
    res.send('cookie');
})

module.exports = router;