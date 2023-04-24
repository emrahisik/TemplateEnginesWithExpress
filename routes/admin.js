const router = require("express").Router();
const path = require("path");

const products = [];

router.route('/add-product')
  .get((req, res, next) => {
    console.log("a-p", products);
    res.render('add-product', { docTitle: 'Add Product'});
  })
  .post((req, res, next) => {
    products.push(req.body)
    console.log("p", req.body);
    res.redirect("/");
  });

exports.router = router;
exports.products = products;

