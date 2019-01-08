
class Player {
	constructor(name) {
		this.name = 'Player ' + name;
		this.score = 0;
	}
}

const game = {
	dice: [ 
		{
			value: 1,
			source: '<img src="images/dice-1.png">'
		},
		{
			value: 2, 
			source: '<img src="images/dice-2.png">'
		},
		{
			value: 3,
			source: '<img src="images/dice-3.png">'
		},
		{
			value: 4, 
			source: '<img src="images/dice-4.png">'
		},
		{
			value: 5,
			source: '<img src="images/dice-5.png">'
		},
		{
			value: 6, 
			source: '<img src="images/dice-6.png">'
		}
	],
	diceIn: 6,				//as dice are removed from play, this number is lowered.
	playerCounter: 1,		//tracks what player's turn it is
	players: [],			//array holding players created by player class 			
	rollDice() {
		this.clearInPlayDice();				//clears board of in play dice before each roll
		for (let i = 0; i < this.diceIn; i++) {				//rolls dice
			let j = Math.floor(Math.random()*6);
			$(`#slot-${i}`).append(this.dice[j].source);
		}
	},
	clearInPlayDice() {						//clears in play dice board
		for (let i = 0; i < 6; i++) {	
			$(`#slot-${i}`).empty();
		}
	}, 
	showInstructions() {				//show game instructions
		let $instText = $('#instructions-text');
		if ($instText[0].style.visibility === '' || $instText[0].style.visibility === 'hidden') {
			$instText[0].style.visibility = 'visible';
			$instText.velocity('transition.expandIn', 500);
		} else {
			// $instText.velocity('fadeOut', 2000); ////need to fix fadeout animation
			$instText[0].style.visibility = 'hidden';
		}
	}, 
	startGame(numPlayers) {
		for (let i = 1; i <= numPlayers; i++) {		//creates players
			this.players.push(new Player(`${i}`));
		}
	}
}
	










//listeners

$('body').on('click', (event) => {
	if (event.target.innerText === 'How to Play') {
		game.showInstructions();
	}

	if (event.target.innerText === 'Roll') {
		game.rollDice();
	}
});


