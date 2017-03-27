var express = require('express');
var authRouter = new express.Router;
var passport = require('passport');
require('./passportConfig');

authRouter.route('/auth')
    .get(function(req, res) {
         res.render('auth/signin');
    })
    .post(passport.authenticate('local-signin', {
        successRedirect:    '/',
        failureRedirect:    '/auth',
      //  failureFlash:       true,
      //  badRequestMessage:  'Login failed'
    }));

authRouter.route('/auth/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect:    '/',
        failureRedirect:    '/auth'/*,
        failureFlash:       true,
        badRequestMessage:  'Hiányzó adatok'*/
    }));

authRouter.use('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/auth');
});

module.exports = authRouter;