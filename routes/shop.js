const router = require("express").Router();
const products = require("./admin").products;

router.get("/", (req, res, next) => {
  res.render("shop", { docTitle: "My Shop", products: products });
});

module.exports = router;
