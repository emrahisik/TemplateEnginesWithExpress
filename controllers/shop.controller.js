const { path, readFile} = require('../utils/CRUDL')
const Product = require("../models/product.model");
const Cart = require("../models/cart.model")

const cartDbPath = path.join(require.main.path, 'db', 'cart.json')

exports.getCart = async(req,res,next)=>{
  const jsonItemsInCart = await readFile(cartDbPath)
  const itemsInCart = JSON.parse(jsonItemsInCart)
  console.log(itemsInCart)
  res.render('shop/cart',{
    docTitle: 'My Cart',
    items: itemsInCart,
    path: '/cart'
  })
}

exports.postCart = async (req,res,next)=>{
  const { productId, ...rest } = req.body;
  const product = await Product.fetchById(productId)
  await Cart.addToCart({product, quantity: rest?.quantity||1})
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