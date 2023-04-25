const router = require("express").Router();
const path = require("path");

const products = [];

router.route('/add-product')
  .get((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
  })
  .post((req, res, next) => {
    products.push(req.body)
    res.redirect("/");
  });

exports.router = router;
exports.products = products;

