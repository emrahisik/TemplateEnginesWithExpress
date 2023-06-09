const router = require("express").Router();
const { getCart, getCheckout, getProducts, getOrders, getProduct, postCart, deleteCart } = require("../controllers/shop.controller");

router.route('/').get(getProducts);
router.route('/cart').get(getCart).post(postCart);
router.route('/cart/remove-item').post(deleteCart)
router.route('/products').get(getProducts)
router.route('/products/:productId').get(getProduct)
router.route('/checkout').get(getCheckout)
router.route('/orders').get(getOrders)

module.exports = router;
