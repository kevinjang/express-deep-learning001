const express = require('express')
const router = express.Router();
const winstonLogger = require('winston');


router.get('/', (req, res)=>{
    const {logger} = req;
    logger.log('info', 'winston info');
    logger.error('winston error')
    res.send('winston logger')
})

module.exports= router;