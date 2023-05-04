const express = require("express");
const path = require("path");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const notFound = require('./controllers/404.controller')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(notFound);

app.listen(3000, () => console.log("Listening at Port 3000"));
