const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.attachment('./public/images/VCG211241121526.jpg');
    res.send('done!')  
})

module.exports = router;