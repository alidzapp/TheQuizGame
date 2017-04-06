'use strict'
const Datastore = require('nedb');
const User = require('./user');

class UserStore {

    constructor() {
        this.userdb = new Datastore({
            filename: './db/users',
            autoload: true,
        });
    }

    getUserByEmail(email, callback) {
        this.userdb.findOne({ email }, (err, found) => {
            if (found) {               
                const user = 
                    new User(found.username, 
                             found.name,
                             found.email, 
                             found.country,                             
                             found.passwordHash
                    );                                
                user.setPlayedTopics(found.playedTopics);
                user.setGamesPlayed(found.gamesPlayed);
                callback(null, user);
            } else {
                callback(null, false);
            }
        });
    }

    addUser(userObj, callback/*ezen adja vissza az elkeszult usert*/) {
        this.getUserByEmail(userObj.email, (err, found) => {
            if (err) {
                callback(err)
            } else if (found) {
                callback(null, false);
            } else if (!found) {
                userObj.playedTopics = [];
                userObj.gamesPlayed = {
                            wins: 0,
                            losses: 0, 
                            draws: 0
                        };
                this.userdb.insert(userObj, (err, userFromDb) => {
                    callback(null, userFromDb);
                });
            }
        });    
    }

}

module.exports = new UserStore();
