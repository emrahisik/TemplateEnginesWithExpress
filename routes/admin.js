const router = require("express").Router();
const { getAddProduct, postAddProduct, getProducts, getEditProduct, deleteProduct } = require('../controllers/admin.controller')

router
  .route("/add-product")
  .get(getAddProduct)
  .post(postAddProduct)
router
  .route("/edit-product/:productId")
  .get(getEditProduct)
  .post(postAddProduct)
router.post('/delete-product', deleteProduct)


router.route('/products').get(getProducts)

module.exports = router;
