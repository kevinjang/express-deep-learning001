const express = require('express');
const router = express.Router();
const jwt = require('express-jwt')
const secret = 'ksnl_secret';

router.post('/', (req, res, next)=>{
    const client_id = req.headers['client_id'];
    const authorization_type = req.headers['response_type'];
    
    
    res.send(`${client_id} & ${authorization_type}`);


})

module.exports = router;