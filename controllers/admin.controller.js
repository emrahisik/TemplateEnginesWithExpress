const Product = require("../models/product.model");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    product: null,
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body
  const existingItemId = req.params?.productId;
  const product = new Product(title, imageUrl, description, price);
  if(existingItemId){
    product.id = existingItemId
    product.update(existingItemId)
  }else{
    product.save();
  }
  res.redirect("/admin/products");
};

exports.getEditProduct = async (req,res,next) => {
  const { productId } = req.params
  const product = await Product.fetchById(productId)
  res.render("admin/edit-product", {
    docTitle: "Edit Product",
    product,
    path: '/admin/edit-product',
  });
}

exports.deleteProduct = async (req,res,next) => {
  const { productId } = req.body;
  await Product.destroy(productId)
  res.redirect('/admin/products')
}

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll()
  res.render("admin/products", {
    docTitle: "Admin Products",
    products: products,
    path: '/admin/products',
  });
}


/**
 * Alternatively we can use callback functions to get the products asynchronously
 */
// exports.getProducts = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render("shop", {
//       docTitle: "My Shop",
//       products: products,
//       productCSS: true,
//       shopActive: true,
//     });
//   });
// };
