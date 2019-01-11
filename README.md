# FARKLE: a dice game

This is a simple web deployment of the classic dice game.

## Getting Started/Installation Notes/System Specifications

Unfortunately, iOS support is still forthcoming. However, on personal computers and Android devices, Farkle is fully functional and does not require any special programs. One simply needs an up-to-date browser. Google Chrome is recommended.

## How to Play

1. Select number of players.
2. At the beginning of each turn, play proceeds as follows:
* Player rolls 6 dice. After each roll, a player must choose dice to score. A die can be chosen by clicking it, and moving it to the upper scoring row. Upon hitting the roll or end turn buttons, the score of the dice is automatically added to the turn score/leaderboard as applicable.
* Scored dice are removed from the game, and the player rolls again with the remaining dice. If the player scores all 6 dice, he or she starts with 6 again. The turn score increases cumulatively with each roll.
* The player continues to roll until the turn is ended voluntarily or the player farkles. 
* If the player ends the turn voluntarily, the turn score is added to the leaderboard. If the player farkles (fails to roll any scoreable dice), then turn score points are forfeited, and the turn ends.
3. Play continues until one player reaches 10,000 points.


Farkle README

Rules:
--Each player takes turns rolling 6 dice to try and score points.
--After each successful roll, player may set aside scoring dice, and roll remaining dice.
--If player rolls and no scoring combinations occur, player has "farkled" and turn is over.
--If player rolls and scores with all dice, player has "hot dice" and may start over with 6 dice. 
--Score continues to add up as turn continues. Player may stop rolling at any time, and "bank" points to scoreboard, ending player's turn. Farkling also ends player's turn, but if player farkles, all accumulated points are forfeited.
--First player to 10,000 points in bank wins.



 --- 

things to add--
- iphone/ipad support
- 3d animated dice rolling
- web chat and firebase connectivity for remote play with friends.
- computer players



 ---
Ideas for extra non-standard features (time permitting):
	--player may customize parameters for win (ie: points needed to win; points scored for each dice combination).
	--"Hall of Fame" -- to save top 10 longest hot dice streaks.


<!-- who; what; why; req for run; req for inst; contributors; forthcoming features; links to wireframes/userstories
	presentation
	who, what, painpionts solved, why solve pain points, tour of site, challenges overcome, extra stuff, forthcoming features, questions

	markdown syntax
	# - h1
	## - h2 etc
	### h3 etc

	**bold**
	_italics_

	bullet list: * list item
				   * inner list item
				   code ` //code here `
				   multi line code ``` //code ```
 -->


 ---

<!-- 

 Tetris README.

 Rules: 

 --Randomized blocks will generate, and will need to be placed on game board. 
 --WHen a line is complete, it will disappear, and all remaining blocks shift down. Score is incremented +1 for each line completed. Game continues until blocks overflow top of gameboard.

 User Stories for Tetris:

 --User presses start button, which begins game on level 1.
 --Every X minutes, the game will "level up". Blocks will generate faster, and move down the board faster. Music and background will change.
 --Player will use arrow keys to control and rotate the blocks as they appear.
 --Player will only be able to control one block at a time. Once the controlled block is placed, control will transfer to next lowest block. 
 --Game gets infinitely harder. Each level is a little faster than the last. Player lasts as long as possible. 
 --Upon completion of game, player is presented with new game button

---
Ideas for extra features (time permitting):
	--"Hall of Fame" tracking top ten scores. Allows user to input initials.
 -->