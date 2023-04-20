const router = require('express').Router();
const path = require("path");
const products = require('./admin').products;

router.get('/',(req,res,next)=>{
  console.log('sh', products)
  res.render('shop', { docTitle: 'My Shop', products: products });
});

module.exports = router;