const router = require('express').Router();
const path = require("path");
const products = require('./admin').products;

router.get('/',(req,res,next)=>{
  console.log('sh', products)
  res.status(200).sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;