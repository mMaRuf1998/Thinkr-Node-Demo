const schemaValidation = require('./model/schemaValidation')
const ExpressError = require('./utils/ExpressError')
const passport = require('passport');
const { Product } = require("./model/products");
const { Review } = require("./model/reviews");

const thinkrValidation = (req, res, next) => {
    const { error } = schemaValidation.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join('.');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo  = req.originalUrl ;
        return res.redirect("/login");
     }
    next() ;
}

const isAuthor = async (req,res,next) => {
    const {id} = req.params ;
    let itemSelected = await Product.findById(id);
    if(!itemSelected.author._id.equals(req.user._id)){
        req.flash("error","Unauthorized Access Denied !")
        console.log("Caught")
        return res.redirect("/list")
    }
    
   // console.log(itemSelected.author._id, "   ----   " , req.user._id)
    next() ;
}

const isReviewAuthor =  async (req,res,next) => {
    const {reviewId} = req.params ;
    let reviewSelected = await Review.findById(reviewId);
    if(!reviewSelected.author._id.equals(req.user._id)){
        req.flash("error","Unauthorized Access Denied !")
        console.log("Caught")
        return res.redirect("/list")
    }
    
   // console.log(itemSelected.author._id, "   ----   " , req.user._id)
    next() ;
}

const storeReturnTo = (req, res, next) => {
   
    res.locals.returnTo = req.session.returnTo;
    console.log(res.locals.returnTo)
    
    next();
}




module.exports = {thinkrValidation , isLoggedIn , storeReturnTo,isAuthor ,isReviewAuthor} ; 