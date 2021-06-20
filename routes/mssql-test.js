const express = require('express');
const router = express.Router();
const {test} = require('../utils/dal/mssql-utils/mssql-utils')

router.get('/',async (req, res, next)=>{
    const logger = req.logger;
    logger.log('info', 'testing mssql ');
    // console.log('testing mssql')
    await test({logger});
    res.send('done!')
})

module.exports = router;