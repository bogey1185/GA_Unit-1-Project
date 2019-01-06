Farkle README

Rules:
--Each player takes turns rolling 6 dice to try and score points.
--After each successful roll, player may set aside scoring dice, and roll remaining dice.
--If player rolls and no scoring combinations occur, player has "farkled" and turn is over.
--If player rolls and scores with all dice, player has "hot dice" and may start over with 6 dice. 
--Score continues to add up as turn continues. Player may stop rolling at any time, and "bank" points to scoreboard, ending player's turn. Farkling also ends player's turn, but if player farkles, all accumulated points are forfeited.
--First player to 10,000 points in bank wins.

User Stories for Farkle

1. User declares how many players (min 2; no theoretical limit, but may limit this game to 4).
2. At start of each turn:
 	--Player rolls dice. 6 dice present random numbers.
 		--if no scores, "farkle" -- next player's turn.
 		--if scores, player must set aside at least one scoring die each roll. Player will be able to click on the dice to set them aside, and add points to the turn bank.
 		--Player may choose how to score. Ie: 1's are worth 100 points. If player rolls two 1's, player may choose to set aside both 1's, or just one 1. Then player chooses whether to bank points and end turn and roll again. If player set aside 1 die, they roll the remaining 5. If player set aside 2 dice, player re-rolls remaining 4 dice.
 	--Player continues to roll dice until even occurs that ends the turn.
 		--Event 1: Player rolls and no scoring dice occur. Player has farkled. Turn ends. Points in turn bank are forfeited.
 		--Event 2: Player opts to end turn by pushing button. All points in turn bank are added to permanent scoreboard for player. First player to 10,000 points wins game.
 3. Once a winner is decided, a message on the screen is displayed. Player is presented with "play again?" button.

 ---
Ideas for extra non-standard features (time permitting):
	--player may customize parameters for win (ie: points needed to win; points scored for each dice combination).
	--"Hall of Fame" -- to save top 10 longest hot dice streaks.

 ---



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
