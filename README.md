# TheQuizGame
Online multiplayer quiz game written in JavaScript. 

## Design:
![](design/signin.png)
![](design/signup.png)
![](design/dashboard.png)
![](design/topics.png)
![](design/newtopic.png)
![](design/Highscores.png)
![](design/game.png)
![](design/game_type2.png)
![](design/game_end.png)

## XP system
After each game you are rewarded with experience points (XP) based on your performance in the game. Maximum points for each game are 300 XP. The points earned are the sum of:

- Match score: the points you get for your right answered questions, the faster you answer the more points you get (maximum 160)
- Finish bonus: you are rewarded with 40 XP if you finish the game 
- Victory bonus: you are rewarded with 100 XP if you win the game

If your game ends in a tie, you share the victory bonus with your opponent (you get 50 XP each).