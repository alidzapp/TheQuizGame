var express = require('express');
var authRouter = new express.Router;
var passport = require('passport');
require('./passportConfig');

authRouter.route('/auth')
    .get(function (req, res) {        
        res.render('auth', {
            messages: req.flash(),
            additionalscripts: true,
            additionalstylesheets : true
        });
    });


authRouter.route('/auth/signin')
    .post(passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true
    }));

authRouter.route('/auth/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true
    }));

authRouter.use('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/auth');
});

module.exports = authRouter;