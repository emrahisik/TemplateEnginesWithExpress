const router = require('express').Router();
const products = require('./admin').products;

router.get('/',(req,res,next)=>{
  console.log('sh', products)
  res.render('shop', { docTitle: 'My Shop', products: products, productCSS: true, shopActive: true});
});

module.exports = router;