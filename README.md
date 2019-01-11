# FARKLE: a dice game

This is a simple web deployment of the classic dice game.

## About the Author

I am a student at General Assembly in its Web Development Immersive program. As a GA student, I was tasked with creating a browser game that showcases my current level of skill with HTML5, CSS3, JS, and jquery. I chose Farkle because it is a fun and easy-to-learn game that my family has played together for a long time. In addition to the above languages, this website also deploys VelocityJS animations in its operation.

## Getting Started/Installation Notes/System Specifications

On personal computers and Android devices, Farkle is fully functional and does not require any special programs. One simply needs an up-to-date browser; Google Chrome is recommended. iOS support is forthcoming.

## How to Play

1. Select number of players.
2. At the beginning of each turn, play proceeds as follows:
  * Player rolls 6 dice. After each roll, a player must choose dice to score. A die can be chosen by clicking it, and moving it to the upper scoring row. Upon hitting the roll or end turn buttons, the score of the dice is automatically added to the turn score/leaderboard as applicable.
  * Scored dice are removed from the game, and the player rolls again with the remaining dice. If the player scores all 6 dice, he or she starts with 6 again. The turn score increases cumulatively with each roll.
  * The player continues to roll until the turn is ended voluntarily or the player farkles. 
  * If the player ends the turn voluntarily, the turn score is added to the leaderboard. If the player farkles (fails to roll any scoreable dice), then turn score points are forfeited, and the turn ends.
3. Play continues until one player reaches 10,000 points.

## Contributors

Thanks to Reuben Ayres and James Haff at GA for fielding my questions as I developed this game. Also, a thanks to the other students in my cohort for their continued support and collaboration. **Finally, a thanks to my family, who helped bug-test the game as it was deployed in various stages of development.**

## Dev Documentation

Links to the [wireframe images](https://github.com/bogey1185/GA_Unit-1-Project/tree/d2dcddd53b1cff8877eac4b3bef5d8ebfeb1b63d/images), [wireframe commentary](https://github.com/bogey1185/GA_Unit-1-Project/blob/d2dcddd53b1cff8877eac4b3bef5d8ebfeb1b63d/wireframes.md), and [user stories](https://github.com/bogey1185/GA_Unit-1-Project/blob/d2dcddd53b1cff8877eac4b3bef5d8ebfeb1b63d/user-stories.md) utilized in development of this game are available should you wish to review them.

## Upcoming Features

The following are features that will be added to the game in the near future:
* iOS Support
* 3D animations
* Firebase connectivity and web chat functionality for remote play with friends
* Computer players for solo play
