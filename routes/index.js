const express = require('express');
const router = new express.Router;
const passport = require('passport');

router.route('/')
    .get(passport.authenticationMiddleware(), function(req, res) {
         res.render('dashboard');
    });

module.exports = router;
