const Product = require("../models/product.model");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    formsCSS: true,
    adminActive: true,
    layout: "main-layout",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body);
  product.save();
  res.redirect("/");
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll()
  res.render("shop/product-list", {
    docTitle: "My Shop",
    products: products,
    productCSS: true,
    shopActive: true,
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
