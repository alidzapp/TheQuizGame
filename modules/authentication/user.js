'use strict'   
module.exports = class User {
    constructor(username, name, email, country, passwordHash) {
        this._username = username;
        this._name = name;
        this._email = email;
        this._country = country;
        this._passwordHash = passwordHash;
        this._avatar = '';
        this._playedTopics = {};
        this._gamesPlayed = {};
    }
  
    setPlayedTopics(playedTopics) {
        let ptSet = new Set();
        if (playedTopics) {    
            for(let topic of playedTopics){
                ptSet.add(topic);
            }      
            this._playedTopics = ptSet;
        }
    }

    setGamesPlayed(gamesPlayed){
        if(gamesPlayed){
            this._gamesPlayed = gamesPlayed;
        }
    }
    setAvatar(avatar){
        this._avatar = avatar;
    }
    addTopic(topic) {
        this._playedTopics.add(topic);
    } 
  
    incWinNum(){
        this._gamesPlayed.wins++;
    }
    
    incLossesNum(){
        this._gamesPlayed.losses++;
    }
    incDrawNum(){
        this._gamesPlayed.draws++;
    }
  
    getPlayedTopics() {
        return this._playedTopics;
    }

    getUserName() {
        return this._username;
    }

    getUserEmail(){
        return this._email;
    }

    getName(){
        return this._name;
    }

    getCountry(){
        return this._country;
    }
    getAvatar(){
        return this._avatar;
    }
    validPassword(trialHash) {
        return this._passwordHash === trialHash;
    }

}