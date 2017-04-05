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
                const user = new User(found.email, found.passwordHash);
                user.setPlayedTopics(user.playedTopics);
                user.setGamesPlayed(user.gamesPlayed);
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
                this.userdb.insert(userObj, (err, userFromDb) => {
                    callback(null, userFromDb);
                });
            }
        });    
    }

}

module.exports = new UserStore();
