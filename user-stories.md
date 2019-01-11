# User Stories

1. User declares how many players (min 2; limit 8).
2. First player rolls by hitting roll button. If player has not farkled, player can click on lower-row dice to select them for scoring. Dice selected are moved to top row. 
3. Player chooses to roll again with non-scored dice or end turn, and pushes the appropriate button. In either case, the dice in the scoring row will be automatically evaluated for maximum points. Those points will be posted to the player's turn score. If the player pressed the end turn button, then the turn score will also be automatically posted to the leaderboard.
4. If player selected end turn, the game will switch to the next player automatically.
5. If player selected roll, then any dice not selected for scoring will be rolled again, and scoring dice are selected from the resulting dice. 
6. If player scores all 6 dice, 6 new dice will automatically be provided by the game to continue the turn. The game continues in this fashion until the player hits the end turn button or the player farkles (roll yields no scoreable dice). 
7. The first player to reach a leaderboard score of 10,000 wins. Upon that happening, the winner is declared in the message line, and all buttons (other than the game reset button in the bottom left) are disabled.
8. Players may use the reset button to play again. Upon pressing this button, the website reverts to the original select players screen.
