
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
	playerCounter: null,	//tracks what player's turn it is
	players: [],			//array holding players created by player class 
	turnScore: 0,
	diceInPlay: [],			//holds all dice rolled
	usedDiceArray: [false, false, false, false, false, false],
	firstRoll: true,
	rollDice() {
		//add a function to score the banked points and add them to turn score
		if (this.firstRoll) {				//firstroll prevents player from hitting roll again before commiting any dice to scoring panel
			this.clearInPlayDice();				//clears board of in play dice before each roll
			this.clearBankDice();
			this.firstRoll = false;
			for (let i = 0; i < this.diceIn; i++) {				
				let j = Math.floor(Math.random()*6);
				this.diceInPlay.push(this.dice[j]);
				$(`#slot-${i}`).append(this.dice[j].source);
			}
		} else {
			for (let i = 0; i < this.usedDiceArray.length; i++) {
				if (this.usedDiceArray[i] !== false) {
					this.firstRoll = true;
					this.rollDice();
				}
			}
		}
	},
	clearInPlayDice() {						//clears in play dice board
		for (let i = 0; i < 6; i++) {	
			$(`#slot-${i}`).empty();
		}
		this.diceInPlay = [];
		this.usedDiceArray = [false, false, false, false, false, false];
	},
	clearBankDice() {
		for (let i = 0; i < 6; i++) {	
			$(`#save-${i}`).empty();
		}
	}, 
	showInstructions() {				//show game instructions
		let $instText = $('#instructions-text');
		if ($instText[0].style.visibility === '' || $instText[0].style.visibility === 'hidden') {
			$instText[0].style.visibility = 'visible';
			$instText.velocity('transition.expandIn', 500);
		} else {
			// $instText.velocity('fadeOut', 2000); ////need to fix fadeout animation*********
			$instText[0].style.visibility = 'hidden';
		}
	}, 
	startGame(numPlayers) {
		for (let i = 1; i <= numPlayers; i++) {		//creates players -- button press at beginning will pass num of players
			this.players.push(new Player(`${i}`));
			$('#score').append(`<p>${this.players[i-1].name}: <span id="score-${i}">0</span></p>`); //adds a place for each player on leaderboard
		}
		this.playerCounter = 1; //game state (ie whose turn it is) will be controlled by playerCounter. Once game is initialized, the counter is set to 1 to denote it is player 1's turn.
		this.messageGen('player');
	},
	resetGame() {		//resets game. will probably put reset button on page somewhere
		this.diceIn = 6;
		this.playerCounter = null;
		this.players = [];
		this.turnScore = 0;
		this.rollControl = 0;
		this.firstRoll = true;
		this.clearInPlayDice();
		this.clearBankDice();
		$('#score').empty();
		$('#turnSc').text('0');
	},
	resetTurn() {
		this.diceIn = 6;
		this.diceInPlay = [];
		this.turnScore = 0;
		this.rollControl = 0;
		this.firstRoll = true;
		this.clearInPlayDice();
		this.clearBankDice();
		$('#turnSc').text('0');
	},
	messageGen(input) {
		if (input === 'player') {
			let currentPlayer = this.playerCounter - 1;
			let playerName = this.players[currentPlayer].name;
			$('#message').text(`It's ${playerName}'s turn!`);
		}
	},
	nextTurn() {
		let currentPlayer = this.players[this.playerCounter - 1];
		if (this.playerCounter === this.players.length) {
			currentPlayer.score += this.turnScore;
			$(`#score-${this.playerCounter}`).text(`${this.players[this.playerCounter - 1].score}`);
			this.resetTurn();
			this.playerCounter = 1;
			this.messageGen('player');
		} else {
			this.players[this.playerCounter - 1].score += this.turnScore;
			$(`#score-${this.playerCounter}`).text(`${this.players[this.playerCounter - 1].score}`);
			this.resetTurn();
			this.playerCounter++;;
			this.messageGen('player');
		}
	}, 
	manipulateDice(input) {   //moves dice between rolled row and saved row
		switch (input) {
			case 'slot-0':
				if (this.usedDiceArray[0] === false) {
					this.usedDiceArray[0] = this.diceInPlay[0];
					$('#save-0').append(this.usedDiceArray[0].source);
					$('#slot-0').empty();
					this.diceIn--;
				}
				break;
			case 'slot-1':
				if (this.usedDiceArray[1] === false) {
					this.usedDiceArray[1] = this.diceInPlay[1];
					$('#save-1').append(this.usedDiceArray[1].source);
					$('#slot-1').empty();
					this.diceIn--;
				}
				break;
			case 'slot-2':
				if (this.usedDiceArray[2] === false) {
					this.usedDiceArray[2] = this.diceInPlay[2];
					$('#save-2').append(this.usedDiceArray[2].source);
					$('#slot-2').empty();
					this.diceIn--;
				}
				break;
			case 'slot-3':
				if (this.usedDiceArray[3] === false) {
					this.usedDiceArray[3] = this.diceInPlay[3];
					$('#save-3').append(this.usedDiceArray[3].source);
					$('#slot-3').empty();
					this.diceIn--;
				}
				break;
			case 'slot-4':
				if (this.usedDiceArray[4] === false) {
					this.usedDiceArray[4] = this.diceInPlay[4];
					$('#save-4').append(this.usedDiceArray[4].source);
					$('#slot-4').empty();
					this.diceIn--;
				}
				break;
			case 'slot-5':
				if (this.usedDiceArray[5] === false) {
					this.usedDiceArray[5] = this.diceInPlay[5];
					$('#save-5').append(this.usedDiceArray[5].source);
					$('#slot-5').empty();
					this.diceIn--;
				}
				break;
			case 'save-0':
				if (this.usedDiceArray[0]) {
					$('#slot-0').append(this.usedDiceArray[0].source);
					this.usedDiceArray[0] = false;
					$('#save-0').empty();
					this.diceIn++;
				}
				break;
			case 'save-1':
				if (this.usedDiceArray[1]) {
					$('#slot-1').append(this.usedDiceArray[1].source);
					this.usedDiceArray[1] = false;
					$('#save-1').empty();
					this.diceIn++;
				}
				break;
			case 'save-2':
				if (this.usedDiceArray[2]) {
					$('#slot-2').append(this.usedDiceArray[2].source);
					this.usedDiceArray[2] = false;
					$('#save-2').empty();
					this.diceIn++;
				}
				break;
			case 'save-3':
				if (this.usedDiceArray[3]) {
					$('#slot-3').append(this.usedDiceArray[3].source);
					this.usedDiceArray[3] = false;
					$('#save-3').empty();
					this.diceIn++;
				}
				break;
			case 'save-4':
				if (this.usedDiceArray[4]) {
					$('#slot-4').append(this.usedDiceArray[4].source);
					this.usedDiceArray[4] = false;
					$('#save-4').empty();
					this.diceIn++;
				}
				break;
			case 'save-5':
				if (this.usedDiceArray[5]) {
					$('#slot-5').append(this.usedDiceArray[5].source);
					this.usedDiceArray[5] = false;
					$('#save-5').empty();
					this.diceIn++;
				}
				break;
			default:
				return;
		}
	},
	scoreDice(diceArray) {
		let numArray = [];
		for (let i = 0; i < diceArray.length; i++) {
			if (diceArray[i] !== false) {
				numArray.push(diceArray[i].value);
			}
		}
		let finalArray = numArray.sort();
		console.log(finalArray);
		if (finalArray[0] === finalArray[5] && finalArray.length === 6) {
			console.log('six of a kind!');
		} else if (finalArray[0] === finalArray[2] && finalArray[3] === finalArray[5] && finalArray.length === 6) {
			console.log('2 triplets!');
		} else if (finalArray[0] === finalArray[1] && finalArray[2] === finalArray[3] && finalArray[4] === finalArray[5] && finalArray.length === 6) {
			console.log('3 pair!');
		} else if (finalArray[0] === 1 && finalArray[1] === 2 && finalArray[2] === 3 && finalArray[3] === 4 && finalArray[4] === 5 && finalArray.length === 6) {
			console.log('straight!');
		} else if (finalArray[0] === finalArray[4] && finalArray.length === 5) {
			console.log('five of a kind!');
		} else if (finalArray[0] === finalArray[3] && finalArray.length === 4) {
			console.log('four of a kind!');
		} else if (finalArray[0] === 6 && finalArray[2] === 6 && finalArray.length === 3) {
			console.log('three of a kind 6s!');
		} else if (finalArray[0] === 5 && finalArray[2] === 5 && finalArray.length === 3) {
			console.log('three of a kind 5s');
		} else if (finalArray[0] === 4 && finalArray[2] === 4 && finalArray.length === 3) {
			console.log('three of a kind 4s');
		} else if (finalArray[0] === 3 && finalArray[2] === 3 && finalArray.length === 3) {
			console.log('three of a kind 3s');
		} else if (finalArray[0] === 2 && finalArray[2] === 2 && finalArray.length === 3) {
			console.log('three of a kind 2s');
		} else if (finalArray[0] === 1 || finalArray[0] === 5) {
			console.log('fives and ones!');
		} else {
			console.log('farkle');
		}			 
	}
}
	










//listeners

$('body').on('click', (event) => {
	if (event.target.innerText === 'Submit') {
		event.preventDefault();
		let numPlayers = $('input').val();
		game.startGame(numPlayers);
		$('#outer-player-select')[0].style.visibility = 'hidden';
	}

	if (event.target.innerText === 'How to Play') {
		game.showInstructions();
	}

	if (event.target.innerText === 'Roll') {
		game.rollDice();
	}

	if (event.target.innerText === 'End Turn') {
		game.nextTurn();
	}

	if (event.target.innerText === 'Restart Game') {
		game.resetGame();
		$('#outer-player-select')[0].style.visibility = 'visible';
	}

	if (event.target.tagName === 'IMG') {
			game.manipulateDice(event.target.parentNode.id);
	}	
	// console.log(event.target);
});



