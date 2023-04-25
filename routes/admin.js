const router = require("express").Router();

const products = [];

router
  .route("/add-product")
  .get((req, res, next) => {
    res.render("add-product", {
      docTitle: "Add Product",
      formsCSS: true,
      adminActive: true,
      layout: "main-layout",
    });
  })
  .post((req, res, next) => {
    products.push(req.body);
    res.redirect("/");
  });

exports.router = router;
exports.products = products;
