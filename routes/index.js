const express = require('express');
const router = express.Router();
const passport = require('passport');



const indexController = require('../controllers/indexController');

const calenderController = require('../controllers/calenderController');




router.get('/',indexController.index);

router.get('/calender',passport.checkAuthentication,calenderController.calenderPage);


router.get('/showEvents',passport.checkAuthentication,calenderController.showEvent);


router.post('/createEvent',passport.checkAuthentication,calenderController.createEvent);



router.get('/auth/google',
passport.authenticate('google',{scope:['profile','email','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.events']})

);


router.get('/auth/google/callback', 
  passport.authenticate('google', 
  { 
    failureRedirect: '/',
    successRedirect: '/calender',

    }));
 

module.exports = router;