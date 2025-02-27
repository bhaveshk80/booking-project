const User = require("../models/user");

module.exports.renderSignUpForm =  (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try{
        let {username, email,password} = req.body;
    const newUser = User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err)  {
            return next(err);
        }
        req.flash("success", "Welcome to Destination");
        res.redirect("/listings");
    });
    

    }catch(err){
        req.flash("error", "user already exists");
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success","Welcome back ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res) => {
    req.logout((err) => {
        if(err) {
            return next(err);        
        }
        req.flash("success",  "You are logged out now");
        res.redirect("/listings")
    })
};