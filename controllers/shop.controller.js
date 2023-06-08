const Product = require("../models/product.model");
const Cart = require("../models/cart.model")

exports.getCart = async(req,res,next)=>{
  const itemsInCart = await Cart.fetchCart()
  res.render('shop/cart',{
    docTitle: 'My Cart',
    items: itemsInCart,
    path: '/cart'
  })
}

exports.postCart = async (req,res,next)=>{
  const { productId, ...rest } = req.body;
  await Cart.addToCart({productId, quantity: rest?.quantity||1})
  res.redirect('/cart')
}

exports.deleteCart = async (req,res,next)=>{
  const { productId } = req.body;
  await Cart.removeFromCart(productId)
  res.redirect('/cart')
}

exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout',{
    docTitle: 'Checkout',
    items: [],
    path: '/checkout'
  })
}

exports.getOrders = ( req, res, next) => {
  res.render('shop/orders',{
    docTitle: 'My Orders',
    path: '/orders'
  })
}

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll()
  res.render("shop/product-list", {
    docTitle: "Express Store",
    products: products,
    path: '/products',
  });
}

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params
  const product = await Product.fetchById(productId)
  res.render("shop/product-details", {
    docTitle: product.title,
    product: product,
    path: '/products/'+productId,
  });
}