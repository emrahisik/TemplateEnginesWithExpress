const Product = require("../models/product.model");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    formsCSS: true,
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.updateProduct = (req,res,next) => {

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
