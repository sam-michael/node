const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session')
const passport = require('passport')
// Nothing exported in those files so just use the require() statement for execute the file
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// Tell to the app to use make use of the cookie, maximum age = 30 days in milliseconds
// Use the keys.cookiekey for decript the cookie.
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

// Tell to the app to use passort with session, the user.id comming from mongoDB will be stored in cookie for identify request
app.use(passport.initialize());
app.use(passport.session());


// const authRoutes = require('./routes/authRoutes') => authRoutes(app)
// this is a shortcul for imidately call the function
require('./routes/authRoutes')(app);


// In prod env Heroku tells us witch port our app will use by injecting a  PORT variable in 'process.env', 
// so we need to make sure we listen to the port they tell us to use.
// If dev env we will use the default PORT = 5000 (process.env.PORT will be undefined)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
