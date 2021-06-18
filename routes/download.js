const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res)=>{
    const filePath = path.join(__dirname , '../public/images/VCG211241121526.jpg')
    res.download(filePath);
})

module.exports = router;