const express = require('express');
const router = express.Router();
const passport = require('passport');

//Adding the controllers
const userController = require('../controllers/user_controller');


//Adding the routes
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create', userController.create ); // creating a employee
router.get('/profile',passport.checkAuthentication,userController.profile); 
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAdminAuthentication,userController.updateEmp); // updating a employee
router.get('/remove/:id',passport.checkAdminAuthentication,userController.deleteEmp);  // destroying employee

//use passport as middleware to authenticate
router.post('/create-session',passport.authenticate('local',
{failureRedirect: '/'}), userController.login); // login to the employee page

//To destro session and log out
router.get('/signout',userController.logout);
module.exports = router;