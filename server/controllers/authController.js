const express = require('express');
const passport = require('passport');
require('dotenv').config()
const router = express.Router();
const jwt = require('jsonwebtoken')
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
  }), (req, res) => {
    
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  });
  

  router.get('/logout', function(req, res){
    req.logout(function(err){
      if(err) return next(err);
      res.redirect(`${process.env.CLIENT_URL}`);
    });
});

module.exports = router;

