const mongoose = require('mongoose');
const express = require('express')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate');
const { Product } = require('./model/products.js')
const { Review } = require('./model/reviews.js')
const { User } = require('./model/users.js')
const productRoute = require("./routes/productRoute.js")
const reviewRoute = require("./routes/reviewRoute.js")
const userRoute = require("./routes/userRoute.js")
const wrapAsync = require('./utils/wrapAsync')
const ExpressError = require('./utils/ExpressError')
const passport = require("passport")
const session = require("express-session")
const flash = require('express-flash')


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/thinkr');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');`
    // if your database has auth enabled
}
main()
    .then(evt => {
        console.log("Mongo Connection is Done !");
    })
    .catch(err => console.log(err));
///// Server Connection 
////  SCHEMA

var bodyParser = require('body-parser')

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var methodOverride = require('method-override');
const { resolveSoa } = require('dns');
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "/public")));
app.set('view engine', 'ejs')
app.use(flash());

app.use(session({
    secret: "thisissecret",
    resave: false ,
    saveUninitialized: false ,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 3600 * 24 * 7,
        maxAge: 1000 * 3600 * 24 * 7
    }
  }))

  app.use(passport.initialize()) 
  app.use(passport.session())  

app.use((req,res,next)=>{
    res.locals.currentUser = req.user ;  
    //console.log(req.user)
    res.locals.success = req.flash('success')   
    res.locals.error = req.flash('error')   
    res.locals.info = req.flash('info')   
    next();
})

//Routes 
app.use('/list', productRoute)
app.use('/list/:id/details/reviews',reviewRoute )
app.use('/',userRoute )





// 
// Add New ITEM Data Done : 


app.get("*", (req, res) => {
    throw new ExpressError("Page Not Found", 404);
})

app.use((err, req, res, next) => {

    const { status = 500 } = err;

    if (!err.message)
        err.message = "Something went wrong "
    res.render('error', { err });
})

app.listen(3000, () => {
    console.log("Listening on Port 3000")
});