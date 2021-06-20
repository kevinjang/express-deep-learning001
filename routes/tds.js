const express = require('express')
const router = express.Router();
const {test, test2} = require('../utils/dal/tds-util')

router.get('/', async (req, res, next)=>{
    var message = '';
    try {
        const co = await test2();
        console.log('co:', co)
        message = 'done!';
    } catch (error) {
        message = error.message
    }

    res.send(message)
})

module.exports = router;