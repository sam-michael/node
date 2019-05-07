const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// Nothing exported in those files so just use the require() statement for execute the file
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
// const authRoutes = require('./routes/authRoutes') => authRoutes(app)
// this is a shortcul for imidately call the function
require('./routes/authRoutes')(app);


// In prod env Heroku tells us witch port our app will use by injecting a  PORT variable in 'process.env', 
// so we need to make sure we listen to the port they tell us to use.
// If dev env we will use the default PORT = 5000 (process.env.PORT will be undefined)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
