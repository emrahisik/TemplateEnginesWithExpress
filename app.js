const express = require('express');
const path = require("path");

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');
// var bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

// app.use('/users',(req,res,next)=>res.status(200).send('<h1>UserPage</h1>'));

app.use('/admin',adminRouter.router);
app.use(shopRouter);
app.use((req,res,next)=>{
  res.status(404).render('404',{docTitle: '404 Not Found'})
})

app.listen(3000, ()=> console.log('Listening at Port 3000'))