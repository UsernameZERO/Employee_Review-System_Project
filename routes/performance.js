const express = require('express');
const router = express.Router();
const passport = require('passport');

//Adding controller
const perf_Controller = require('../controllers/performance_controller');

router.post('/create',passport.checkAuthentication, perf_Controller.create); // creating the perforance
router.post('/update/:id', passport.checkAdminAuthentication, perf_Controller.updatePerf);  // updating the performance
router.get('/destroy/:id', passport.checkAdminAuthentication, passport.checkAdminAuthentication,perf_Controller.destroy); // destroying the performance

module.exports = router;