'use strict'   
module.exports = class User {
    constructor(username, name, email, country, passwordHash) {
        this._username = username;
        this._name = name;
        this._email = email;
        this._country = country;
        this._passwordHash = passwordHash;
        this._playedTopics = new Set();
        this._gamesPlayed = {
            wins: 0,
            losses: 0, 
            draws: 0
        };
    }
  
    setPlayedTopics(playedTopics) {
        if (playedTopics) {        
            for(let topic of playedTopics){
                this._playedTopics.add(topic);
            }      
        }
    }

    setGamesPlayed(gamesPlayed){
        if(gamesPlayed){
            this._gamesPlayed = gamesPlayed;
        }
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

    authenticate(trialHash) {
        return this._passwordHash === trialHash;
    }

}