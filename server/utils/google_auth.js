// const { default: userModel } = require('../models/userModel');
const userModel = require("../models/userModel");


require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        let user = await userModel.findOne({
          email: profile.emails[0].value
        })
        if(!user){
           user = await userModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
          })
        }
       
        console.log(user)
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id)
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
