const User = require("../model/user");
const Performance = require('../model/performace');


// rendering the home page
module.exports.home = function(req,res){
    res.render('home',{
        title: 'Home',
    });
}

//Admin page -- dashboard
module.exports.adminPage = async function(req,res){
try {
    let performances = await Performance.find({})
    .populate('rvwBYuser')
    .populate({
        path: 'feedbacks',
    });
    
    let users = await User.find({})

    return  res.render('admin', {
        title: 'Admin-Dashboard',
        profile_user: users,
        performances : performances,
    });
} catch (error) {
    console.log('Error',error);
    return;
  }
}

//Employee page
module.exports.EmployeePage = function(req,res){
    User.find({}, function(err, users){
        if (err) {
            console.log(err," error in home func in home");
        }
        res.render('employee', {
            title: 'Dashboard',
            all_users: users,
        });
    })
}