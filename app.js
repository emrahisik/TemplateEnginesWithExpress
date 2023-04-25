const express = require('express');
const path = require("path");
// const { engine } = require('express-handlebars')

const app = express();

// Register the template engine then set it in express
// app.engine('hbs', engine({layoutsDir: 'views/layout', defaultLayout: 'main-layout', extname: 'hbs'}))
app.set('view engine', 'ejs');
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