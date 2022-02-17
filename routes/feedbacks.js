const express = require('express');
const router = express.Router();
const passport = require('passport');

//Adding the controller
const feedbackContainer = require('../controllers/feedback_controller');

router.post('/create', passport.checkAuthentication, feedbackContainer.create); // creating the feedback
router.post('/update/:id', passport.checkAdminAuthentication, feedbackContainer.updateFeed); // updating the feedback
router.get('/destroy/:id', passport.checkAdminAuthentication, feedbackContainer.destroy); // destroying the feedback

module.exports = router;