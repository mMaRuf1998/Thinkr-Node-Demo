const express = require('express')
const userModule = require("../controllers/users.js")
const router = express.Router({ mergeParams: true });
const User = require('../model/users') ; 
const passport = require('passport');
const LocalStrategy = require('passport-local');
const {isLoggedIn} = require("../middleware.js")
const {storeReturnTo} = require("../middleware.js");
const {ConnectionPoolClosedEvent} = require('mongodb');
const flash = require('express-flash')
router.use(flash());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route("/register")
    .get(userModule.showRegistration)
    .post(userModule.postRegistration)

router.route("/login")
    .get(userModule.showLogin)
    .post(storeReturnTo ,passport.authenticate("local",{
    failureRedirect: "/login" ,
    }), userModule.postLogin ) 

router.get("/logout" , userModule.logout)

module.exports = router ;






