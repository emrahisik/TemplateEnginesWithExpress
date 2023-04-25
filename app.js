const express = require("express");
const path = require("path");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter.router);
app.use(shopRouter);
app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "404 Not Found" });
});

app.listen(3000, () => console.log("Listening at Port 3000"));
