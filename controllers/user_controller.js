const User = require("../model/user");
const Performance = require('../model/performace');
const Feedback = require('../model/feedback');

// sign up page
module.exports.signup = function(req,res){
    if (req.isAuthenticated()) {
        res.redirect('/employee');
    }
    return res.render('signup', {
        title: 'employee-Signup'
    });
}

// sign in page
module.exports.signin = function(req,res){
    if (req.isAuthenticated()) {
        if(req.user.usersPower === 'employee'){
          return res.redirect('/employee');
        }
    }
    return res.render('signin', {
        title: 'employee-Signin'
    });
}


// Employee pofile 
module.exports.profile = async function(req, res){
    try {
        const performances= await  Performance.find({})
        .populate('rvwBYuser')
        .populate({
            path: 'feedbacks',
            populate:[
                {path:"fdbkBYuser"},
                {path:"userPerformance"}
              ]
        });
        let users = await User.findById(req.params.id)
        
        return res.render('empProfile',{
                title: "profile",
                performances: performances,
                profile_user: users,
                               
             });
    } catch (error) {
        console.log('Error in profile in user controller---',error);
    return;
    }
   
}

//Getting the data from the sign up to creation of employee
module.exports.create = function(req,res){
    if (req.body.password != req.body.c_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            console.log(`error in finding the employee in signing up`);
            return ;
        }
        if (!user) {
            User.create(req.body, function(err, user){
               if (err) {
                    console.log(`error in creating employee  while  signing up`);
                    return;
                }
                return res.redirect('/'); 
            })
        }else{
            return res.redirect('back');
        }
    })
}

// employee resgistration through admin
module.exports.createEmpForAdmin = function(req,res){
    if (req.body.password != req.body.c_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            console.log(`error in finding the employee in signing up`);
            return ;
        }
        if(req.user.usersPower == 'admin'){ // we can create employee through admin
            console.log("yes");
            if (!user) {
                User.create(req.body, function(err, user){
                   if (err) {
                        console.log(`error in creating employee in admin  while  signing up`);
                        return;
                    }
                    return res.redirect('back');
                })
            }else{
                return res.redirect('back');
            }
            
        }
    })
}



//For  Admin so we create here
module.exports.realAdmin = async function(req,res){

    try {
        let users = User.find({usersPower: 'admin'});
        if (users.length > 0) {
            return res.end('<h1>you already an Admin</h1>');
        }
        await User.create({
            name: "Zero",
            email:"Zero@gmail",
            password: "zero123",
            c_password:"zero123",
            usersPower: "admin",
            department: "Production"
        });
        return res.end(`<h3>Admin credentials</h3> <p>email:  zero@gmail <br> paasword :  zero123</p>  `)
        
    } catch (error) {
        console.log(error);
        return res.end('<h1>server end error please try again</h1>');
    }

}


//Employee login
module.exports.login =  function(req, res){
    if (req.user.usersPower === 'employee') {
        return res.redirect('/employee');
    }
    return res.redirect('back');
    
}

//To Login for admin
module.exports.adminLogin = function(req,res){
    console.log("login ",req.user);
    if (req.isAuthenticated() && req.user.usersPower === 'admin') {
        // if(req.user.usersPower === 'admin') {
        //     return res.redirect('/admin');
        //  }
        //  return res.redirect('/employee');
        return res.redirect('/admin');
    }
    return res.end('---- You are not an ADMIN ---');
}


// to LogOut
module.exports.logout = async function(req, res){
    //Destroying session
    req.logout();
    return res.redirect('/');
}

// Updating the employee details via admin 
module.exports.updateEmp = async function(req, res){
   
    if( req.user.usersPower === 'admin'){
        let users = await User.findByIdAndUpdate(req.params.id,req.body)
            console.log("upppp",req.body);
            console.log("upppp curr",users.name);
            if(req.body.name) users.name = req.body.name;
            console.log(req.body.name);
            return res.redirect('back');
               
    }else{
            return res.status(401).send('Unauthorised');
        }
}

// deleting the employee with their performance and feedback associated with  it
module.exports.deleteEmp = async function(req,res){
    // console.log("enterd delt");
    if (req.user.usersPower === 'admin') {
        let usr = await User.findById(req.params.id)
        let performance = await Performance.deleteMany({rvwFor: req.params.id})
        let feedbacks = await Feedback.deleteMany({ fdbkBYuser: req.params.id})
       
        usr.remove();
        return res.redirect('back');   
    }else{
        console.log("You have no access to remove");
        return res.end('You have no access to remove');
    }
}