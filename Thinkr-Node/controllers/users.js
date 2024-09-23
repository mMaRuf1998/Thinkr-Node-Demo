const User = require('../model/users') ; 
const wrapAsync = require('../utils/wrapAsync.js')  // 



module.exports.showRegistration = wrapAsync(async (req,res)=>{

    res.render("register")

})

module.exports.postRegistration = wrapAsync(async (req,res)=>{
  
    const {username , email , password } = req.body ; 
    const newUser = new User({ username , email })
    const registeredUser = await User.register(newUser,password)

    req.flash('success', 'Registration Successful');
    req.login(registeredUser, function(err) {

        if (err) { return next(err); }
        return res.redirect("/list") ; 
      });
})


module.exports.showLogin =  (req,res) => {
    res.render("login") ;
}

module.exports.postLogin = (req, res) => {

    const redirectUrl = res.locals.returnTo || '/list'; 

    //console.log(res.locals.returnTo)
    delete res.locals.returnTo ;
    req.flash('success', 'Login Successful');
    res.redirect(redirectUrl);
}




module.exports.logout = wrapAsync(async(req,res)=>{
    req.logOut(err=>{
        if(err){
            return next(err) ;
        }

        req.flash("success","Logout Succesful")
        res.redirect("/list")
    })
}) 