const router = require("express").Router();
const { getAddProduct, postAddProduct } = require('../controllers/products.controller')

router
  .route("/add-product")
  .get(getAddProduct)
  .post(postAddProduct);

module.exports = router;
