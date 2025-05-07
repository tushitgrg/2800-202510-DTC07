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
    const user = req.user
    res.cookie('access_token', jwt.sign({id: user._id, name: user.name, email:user.email, avatar:user.avatar}, process.env.JWT_SECRET, {})    , {
        httpOnly : true,                          // JS can’t read it (XSS protection)
        secure   : process.env.VERCEL?true: false, // HTTPS only in production
        sameSite : process.env.VERCEL?'none':'lax',                         // CSRF protection (or 'strict' / 'none')
        maxAge   : 24 * 60 * 60 * 1000,           // 1 day in ms
        path     : '/',                           // send with every request to your origin
        // domain: '.example.com',               // uncomment to share across sub-domains
      });
    
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  });
  

  router.get('/logout', function(req, res){
    req.logout(function(err){
      if(err) return next(err);
      res.redirect('/');
    });
});

module.exports = router;

