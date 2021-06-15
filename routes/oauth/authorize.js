const express = require('express');
const router = express.Router();
const jwt = require('express-jwt')
const secret = 'ksnl_secret';

router.post('/', (req, res, next)=>{
    const client_id = req.headers['client_id'];
    const authorization_type = req.headers['response_type'];
    // console.log('req headers client id:', {...req.headers['client_id']});
    // console.log('client_id&authorization_type:', client_id, authorization_type)
    // console.log(client_id & authorization_type)

    jwt({
        secret: secret,
        algorithms: ['HS256'],
        getToken: function(req){
            if(req.headers.authorization &&req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            }
            else if(req.query && req.query.token) {
                return req.query.token;
            }

            return null;
        }
    })

    
    res.send(`${client_id} & ${authorization_type}`);


})

module.exports = router;