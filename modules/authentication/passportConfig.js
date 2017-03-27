var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('express-validator');
const authenticationMiddleware = require('./middleware')

//Itt kell validálni az adatokat!
// useradatok itt kellenek gyak8-ban megnezni, hogyan mukodik

function findUser (username, callback) {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
});

// Local Strategy for sign-up
passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },   
    function(req, username, password, done) {
       /* MONGOSITAS
        req.app.Models.user.findOne({ neptun: neptun }, function(err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, { message: 'Existing username.' });
            }
            req.app.Models.user.create(req.body)
            .then(function (user) {
                req.flash('success', 'Sikeres regisztráció');
                return done(null, user);
            })
            .catch(function (err) {
                return done(err);
            });
        }); */
        return done(null);
    }
));


passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req, username, password, done) {
        /*req.app.Models.user.findOne({ neptun: neptun }, function(err, user) {
            if (err) { return done(err); }
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Helytelen adatok.' });
            }
            return done(null, user);
        });*/
       /* const user = {
            username: 'test-user',
            password: 'test-password',
            id: 1
        } */
        return done(null,user);
    }
));

passport.authenticationMiddleware = authenticationMiddleware