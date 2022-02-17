const express = require('express');
const router = express.Router();
const passport = require('passport');

//Adding the controllers
const homeController = require('../controllers/home_controller');
console.log("Entered to start page");

//Adding the routes
router.get('/',homeController.home);
router.get('/employee', passport.checkAuthentication , homeController.EmployeePage);
router.get('/admin',passport.checkAdminAuthentication, homeController.adminPage);

//Adding the other routes
router.use('/employee', require('./employee'));
router.use('/performance', require('./performance'));
router.use('/feedback', require('./feedbacks'));
router.use('/admin', require('./admin'));
module.exports = router;