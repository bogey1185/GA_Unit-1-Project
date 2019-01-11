 # Commentary on [wireframe photos](https://github.com/bogey1185/GA_Unit-1-Project/tree/master/images) 

 1. Farkle1: Player presented with start game button.
 2. Farkle2: Player given 4 buttons, to select number of players. (change: now input field)
 3. Farkle3: Gameboard presented. Score in top right. Legend with all scoring combinations below it. Button on top left with link to farkle rules. Two rows of divs displayed to contain dice. Message area below the dice. UI below message area. Game starts. Player 1's turn. Player presses roll.
 4. Farkle4: Roll button populates bottom row of dice randomly. Player 1 did not roll any scoring combos. Message says farkle. Turn ends.
 5. Farkle5: Player 2 hits roll button. Rolls a 1, which is worth 100 points.
 6. Farkle6: Player moves first die to second row, reserving the 100 points it represents. Curr score is now showing 100. Player 2 hits roll again, which rolls the remaining 5 dice.
 7. Farkle7: Player 2 has rolled three of a kind 3's, which is worth face value times 100 (300 points). Player 2 reserves them into top and curr score is now 400.
 8. Farkle8: player 2 has 400 points accumulated. Player 2 may risk it and roll the remaining two dice. Instead, player 2 plays it safe and hits end turn button. The 400 poinns are added to player 2's scoreboard in top right. Player 2 could have hit roll instead. If his roll returned no scoreable dice, he would have 'farkled', and lost the 400 points he accumulated. If he got two 1's, though, his curr score would have become 600, the top row of dice would have cleared, and he would be able to roll with 6 new dice. This process continues until he gets a farkle or hits end turn button.