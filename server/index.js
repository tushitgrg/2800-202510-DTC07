const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path')
const mime = require('mime');

const authRoutes = require('./controllers/authController');
const passportConfig = require('./utils/google_auth');

require('./utils/db');


const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use('/', authRoutes);
app.get('/', (req, res)=>{
  res.send("ho")
})

app.get('/dashboard', (req, res)=>{
  if(!req.user){
    res.redirect('/auth/google')
    return
  }
  res.json(req.user)
})

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
