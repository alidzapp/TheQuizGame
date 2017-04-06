const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validator = require('express-validator');
const authenticationMiddleware = require('./middleware');
const userStore = require('./userStore');
const hasher = require('./hasher');

// Local Strategy for sign-up
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
    function (req, username, password, done) {        
        req.checkBody({
            'name': {
                isLength: {
                    options: [{ min: 6, max: 30 }],
                    errorMessage: 'Name must be between 6 and 30 characters long'
                }
            },

            'username': {
                notEmpty: {
                    errorMessage: 'Username must not be empty'
                },
                 isLength: {
                    options: [{ min: 3 }],
                    errorMessage: 'Username must be minimum 3 characters long'
                }           
                
            },

            'email': {                
                notEmpty: {
                    errorMessage: 'Email must be not empty'
                },
                isEmail: {
                    errorMessage: 'Invalid Email'
                }
            },

            'password': {
                isLength: {
                    options: [{ min: 6 }],
                    errorMessage: 'Password must be minimum 6 characters long'
                }                
            }
        });

        if (req.body.email !== req.body.confirmemail){
            req.flash('error', "Email mismatch");
        }

        if(req.body.password !== req.body.confirmpassword){
            req.flash('error', "Password mismatch");
        }

        req.getValidationResult().then(function (results) {
            if (!results.isEmpty()/*es a req.flash ures e*/ ) {
                results.array().forEach(function (error) {
                    req.flash('error', error.msg);
                });                          
               return done(null, false, {message : "Signup failed."});                
            } else {                 
                userStore.getUserByEmail(username, (err, user) => {
                    if (err) { return done(err);}
                    else if (user) {
                        return done(null, false, { message: 'Already used email' });
                    }
                    userStore.addUser({
                        username: req.body.username,
                        passwordHash: hasher(req.body.password),
                        name: req.body.name,
                        email: req.body.email,
                        country: req.body.country_selector
                    }, (err, user) => {
                        if (err || !user) {                            
                            return done(null, false, { message: 'Something went wrong' });
                        } else {
                            userStore.getUserByEmail(user.email, (err, user) => {
                                return done(null, user, { message: "Successful signup"});
                            });
                            
                        }
                    });

                }); 
           } 
        }); 
    }
));

// Local Strategy for sign-in
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
    function (req, username, password, done) {        
        userStore.getUserByEmail(username, (err, user) => {
            if (err) {
                done(err);
            } else if (!user) {
                done(null, false, { message: 'Incorrect email' });
            } else {
                const passwordHash = hasher(password);
                if (user.validPassword(passwordHash)) {
                    done(null, user);
                } else {
                    done(null, false, { message: 'Incorrect password' });
                }
            }
        });
    }
));

passport.serializeUser((user, done) => {  
    console.log(user); 
    done(null, user.getUserEmail());
});

passport.deserializeUser((email, done) => {    
    userStore.getUserByEmail(email, (err, user) => {
        if (err) {
            done(err);
        } else {
            done(null, user);
        }
    });
});

passport.authenticationMiddleware = authenticationMiddleware;