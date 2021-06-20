const express = require('express')
const router = express.Router();

router.get('/', (req, res, next)=>{
    // const signedCookie = cookieParser.signedCookie(JSON.stringify({
    //     name: 'kevinjang',
    //     age: 18,
    //     gender: 'male'
    // }), secret)
    // console.log('secret:', secret)
    // console.log('signedCookie:', signedCookie)
    // res.cookie("userinfo", signedCookie)
    // console.log('req.secret:', req.secret);
    console.log('env:', process.env)
    res.send('env');
})

module.exports = router;