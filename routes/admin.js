const express = require('express');
const router = express.Router();
const passport = require('passport');

//Adding the Controller 
const userController = require('../controllers/user_controller');

router.get('/credentials',userController.realAdmin); // to know the admin credentials

router.post('/create-emp', passport.checkAdminAuthentication, userController.createEmpForAdmin);


//use passport as middleware to authenticate
router.post('/create',passport.authenticate('local'),userController.adminLogin); // for admin login

module.exports = router;