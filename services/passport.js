const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// mongoose.Model('users') is defined in 'models/User.js' we can acces it like that anywhere 
const User = mongoose.model('users');

// If the user is already in the DB no need to login so we serialize the user.id for use it in the cookie
// for next HTTP request incoming from this user we can trust this user and not asking him to login again
// the user is the user return form the mongoDB and it return with an unique id
// we use this and not googleId for be compatbile with twitter, facebook...
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    // Anytime we access to mongoDB it is an asynchronous action so we can use promise.
    User.findById(id).then((user) => {
        done(null, user);
    })
});

// passeport.js know how to deal with authentication with express in general
// but we have to inform witch strategy it should use (twitter, facebook ...) 
// so we pass to him the google strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        // Check if there is already an user with this id in the database to not duplicate
        // User.findOne({googleId: profile.id}) return a promise so we can use then and callback function
        User.findOne({googleId: profile.id}).then(existingUser => {
            if (existingUser) {
                // Call done for inform the google strategy that we have done 
                // first argument is the error object when something went wrong
                // second argument is the user witch we have done with
                done(null, existingUser);
            } else {
                // create a new class instance and save it in to the database 
                new User({googleId: profile.id}).save()
                // new User({googleId: profile.id}).save() return a promise with the user saved
                // call done with the user for inform the google strategy that we have done
                .then(user => {
                    done(null, user)
                })
            }
        });    
    }
));
