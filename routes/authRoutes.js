const passport = require('passport');


module.exports = app => {
    // Listen fot get to '/auth/google' => passeport.authenticate use the stragegy 'google' === GoogleStrategy
    // we ask to google to give access to the 'profiele' and 'email' of the user trying to acces to 'auth/google'
    // it can be also 'images', 'contact' ... see google doc for more
    app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));

    // Listen fot get to '/auth/google/callback' => passeport.authenticate use the stragegy 'google' === GoogleStrategy
    // Notice that '/auth/google/callback' is the callback url specified in the google strategy 
    // This callback url will contains the code sended by google for the next request, the callback function the google strategy
    // witch allow us to access to ccessToken, refreshToken, profile of the user.
    app.get('/auth/google/callback', passport.authenticate('google'));
};
