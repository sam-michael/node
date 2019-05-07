const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// mongoose.Model('users') is defined in 'models/User.js' we can acces it like that anywhere 
const User = mongoose.model('users');

// passeport.js know how to deal with authentication with express in general
// but we have to inform witch strategy it should use (twitter, facebook ...) 
// so we pass to him the google strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        new User({googleId: profile.id}).save();
    }
));
