const express = require('express');
const passport = require('passport');

const router = express.Router();
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
  }), (req, res) => {
    const user = req.user
    res.cookie('user', user, {
        httpOnly : true,                          // JS can’t read it (XSS protection)
        secure   : false, // HTTPS only in production
        sameSite : 'lax',                         // CSRF protection (or 'strict' / 'none')
        maxAge   : 24 * 60 * 60 * 1000,           // 1 day in ms
        path     : '/',                           // send with every request to your origin
        // domain: '.example.com',               // uncomment to share across sub-domains
      });
    
    res.redirect('http://localhost:3000/dashboard');
  });
  

  router.get('/logout', function(req, res){
    req.logout(function(err){
      if(err) return next(err);
      res.redirect('/');
    });
});

module.exports = router;

