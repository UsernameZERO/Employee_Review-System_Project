const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');


passport.use(new LocalStrategy({
    usernameField: 'email'   
},
function(email, password, done){
    User.findOne({email: email}, function(err,user){
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        if (!user || user.password != password) {
            console.log('Invalid Username/ Password');
            return done(null, false);
        }
        return done(null, user);
    });
}

));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null, user.id);

})

//deserialize the user from the key in the cookies  
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err) {
            console.log('Error in finding user --> deserialized(Passport)');
            return done(err);
        }
        return done(null, user);
    });
});

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
} 

//check if the user is an admin
passport.checkAdminAuthentication = function(req, res, next){
    // console.log("CAA2",res.locals.user);
    if (req.isAuthenticated() && res.locals.user.usersPower === 'admin') {
       return next();
    }else{
    // console.log("You are not an admin");
    // return res.redirect('/');
    return res.end("----- Your not an ADMIN -------");
    }
}
//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in ,then pass on next request
    // console.log("cA", res.locals.user);
    if (req.isAuthenticated()) {
        // console.log("checkAuthentication ",req.body,res.locals.user);
        return next();
    }
    console.log("you are not an employee");
    return res.redirect('/');// if the user is not signed in
}


//

module.exports = passport;