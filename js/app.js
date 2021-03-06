//change instructions

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
	diceInPlay: [],			//holds all dice rolled
	usedDiceArray: [false, false, false, false, false, false],  //temp holds dice selectd by user for scoring
	diceScored: 0,
	resetDiceScored: false,	
	playerCounter: null,	//tracks what player's turn it is
	players: [],			//array holding players created by player class 
	turnScore: 0,
	rollScore: 0,
	firstRoll: true,
	winner: false,
	preventBank: 0,		//stops you from pushing bank button wihtout dice in scoring section. 
	rollDice() {
		if (this.firstRoll) {				//firstroll prevents player from hitting roll again before commiting any dice to scoring panel
			this.bankPoints();
			if (this.resetDiceScored) {
				this.diceScored = 0;
				this.resetDiceScored = false;
			}
			if (this.diceScored + this.diceIn !== 6) this.farkle();
			this.clearInPlayDice();				//clears board of in play dice before each roll
			this.clearBankDice();
			this.preventBank = 0;
			this.firstRoll = false;
			for (let i = 0; i < this.diceIn; i++) {				
				let j = Math.floor(Math.random()*6);
				this.diceInPlay.push(this.dice[j]);
				$(`#slot-${i}`).append(this.dice[j].source);
			}
			this.checkFarkleOnRoll(this.diceInPlay);
		} else {
			if (this.diceIn === 0) {
				this.diceIn = 6;
				this.resetDiceScored = true;
			}
			for (let i = 0; i < this.usedDiceArray.length; i++) {
				if (this.usedDiceArray[i] !== false) {
					this.firstRoll = true;
					this.rollDice();
				}
			}
		}
	},
	bankPoints() {
		this.scoreDice(this.usedDiceArray);
		this.turnScore += this.rollScore;
		$('#turnSc').text(this.turnScore);
		this.clearBankDice();
		for (let i = 0; i < this.usedDiceArray.length; i++) {
			if (this.usedDiceArray[i]) {
				this.usedDiceArray[i] = null;
			}
		}
		this.rollScore = 0;
		this.preventBank = 0;
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
		if ($('#instructions-text').css('opacity') === '0') {
			$('#instructions-text').velocity('transition.expandIn', 500);
		} else {
			$('#instructions-text').velocity('transition.expandOut', 500);
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
		this.rollScore = 0;
		this.firstRoll = true;
		this.winner = false;
		this.clearInPlayDice();
		this.clearBankDice();
		$('#score').empty();
		$('#turnSc').text('0');
	},
	resetTurn() {
		this.diceIn = 6;
		this.diceInPlay = [];
		this.turnScore = 0;
		this.rollScore = 0;
		this.firstRoll = true;
		this.winner = false;
		this.clearInPlayDice();
		this.clearBankDice();
		$('#turnSc').text('0');
	},
	messageGen(input) {
		if (input === 'player') {
			let currentPlayer = this.playerCounter - 1;
			let playerName = this.players[currentPlayer].name;
			$('#message').text(`It's ${playerName}'s turn!`);
		} else if (input === 'farkle') {
			$('#message').text('FARKLE!!!');
		}
	},
	nextTurn() {
		this.bankPoints();
		this.diceScored = 0;
		let currentPlayer = this.players[this.playerCounter - 1];
		if (this.playerCounter === this.players.length) {
			currentPlayer.score += this.turnScore;
			$(`#score-${this.playerCounter}`).text(`${this.players[this.playerCounter - 1].score}`);
			this.resetTurn();
			this.playerCounter = 1;
			this.messageGen('player');
			this.winnerCheck();
		} else {
			this.players[this.playerCounter - 1].score += this.turnScore;
			$(`#score-${this.playerCounter}`).text(`${this.players[this.playerCounter - 1].score}`);
			this.resetTurn();
			this.playerCounter++;;
			this.messageGen('player');
			this.winnerCheck();
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
					this.preventBank++;
				}
				break;
			case 'slot-1':
				if (this.usedDiceArray[1] === false) {
					this.usedDiceArray[1] = this.diceInPlay[1];
					$('#save-1').append(this.usedDiceArray[1].source);
					$('#slot-1').empty();
					this.diceIn--;
					this.preventBank++;
				}
				break;
			case 'slot-2':
				if (this.usedDiceArray[2] === false) {
					this.usedDiceArray[2] = this.diceInPlay[2];
					$('#save-2').append(this.usedDiceArray[2].source);
					$('#slot-2').empty();
					this.diceIn--;
					this.preventBank++;
				}
				break;
			case 'slot-3':
				if (this.usedDiceArray[3] === false) {
					this.usedDiceArray[3] = this.diceInPlay[3];
					$('#save-3').append(this.usedDiceArray[3].source);
					$('#slot-3').empty();
					this.diceIn--;
					this.preventBank++;
				}
				break;
			case 'slot-4':
				if (this.usedDiceArray[4] === false) {
					this.usedDiceArray[4] = this.diceInPlay[4];
					$('#save-4').append(this.usedDiceArray[4].source);
					$('#slot-4').empty();
					this.diceIn--;
					this.preventBank++;
				}
				break;
			case 'slot-5':
				if (this.usedDiceArray[5] === false) {
					this.usedDiceArray[5] = this.diceInPlay[5];
					$('#save-5').append(this.usedDiceArray[5].source);
					$('#slot-5').empty();
					this.diceIn--;
					this.preventBank++;
				}
				break;
			case 'save-0':
				if (this.usedDiceArray[0]) {
					$('#slot-0').append(this.usedDiceArray[0].source);
					this.usedDiceArray[0] = false;
					$('#save-0').empty();
					this.diceIn++;
					this.preventBank--;
				}
				break;
			case 'save-1':
				if (this.usedDiceArray[1]) {
					$('#slot-1').append(this.usedDiceArray[1].source);
					this.usedDiceArray[1] = false;
					$('#save-1').empty();
					this.diceIn++;
					this.preventBank--;
				}
				break;
			case 'save-2':
				if (this.usedDiceArray[2]) {
					$('#slot-2').append(this.usedDiceArray[2].source);
					this.usedDiceArray[2] = false;
					$('#save-2').empty();
					this.diceIn++;
					this.preventBank--;
				}
				break;
			case 'save-3':
				if (this.usedDiceArray[3]) {
					$('#slot-3').append(this.usedDiceArray[3].source);
					this.usedDiceArray[3] = false;
					$('#save-3').empty();
					this.diceIn++;
					this.preventBank--;
				}
				break;
			case 'save-4':
				if (this.usedDiceArray[4]) {
					$('#slot-4').append(this.usedDiceArray[4].source);
					this.usedDiceArray[4] = false;
					$('#save-4').empty();
					this.diceIn++;
					this.preventBank--;
				}
				break;
			case 'save-5':
				if (this.usedDiceArray[5]) {
					$('#slot-5').append(this.usedDiceArray[5].source);
					this.usedDiceArray[5] = false;
					$('#save-5').empty();
					this.diceIn++;
					this.preventBank--;
				}
				break;
			default:
				return;
		}
	},
	scoreDice(diceArray) {
		let highScore = 0;				//if dice qualify for scoring in multiple diff tests, when each test is done it will see if the total is bigger than high score. high score will eventully be the result scored to the turn score
		let tempScore = 0;				//here is where each individual score will be kept until compared to highscore
		let tempDice = 0;
		let highDice = 0;
		const numArray = [];				
		diceArray.forEach((el) => {
			numArray.push(el.value);
		});

		numArray.sort();	//all nums in order

		let countArray = [0, 0, 0, 0, 0, 0];
		numArray.forEach((el) => {
			switch (el) {
				case 1:
					countArray[0]++;
					break;
				case 2:
					countArray[1]++;
					break;
				case 3:
					countArray[2]++;
					break;
				case 4:
					countArray[3]++;
					break;
				case 5:
					countArray[4]++;
					break;
				case 6:
					countArray[5]++;
					break;	
			}
		});

		//6 of a kind
		if (countArray.includes(6)) {
			tempScore = 3000; 
			if (tempScore > highScore) highScore = tempScore;
			tempDice = 6;
			if (tempDice > highDice) highDice = tempDice;
		}
		//-------

		//3 pair
		let doublesCounter = 0;
		countArray.forEach((el) => {
			if (el === 2) doublesCounter++;
		});
		if (doublesCounter === 3) {
			tempScore = 1500;
			if (tempScore > highScore) highScore = tempScore;
			tempDice = 6;
			if (tempDice > highDice) highDice = tempDice;	
		} 
		//-------
		//edge case - 4 of a kind plus another pair (should score like 3 pair)
		if (countArray.includes(4) && countArray.includes(2)) {
			tempScore = 1500;
			if (tempScore > highScore) highScore = tempScore;
			tempDice = 6;
			if (tempDice > highDice) highDice = tempDice;
		}

		//-------

		//straight
		if (numArray[0] === 1 && numArray[5] === 6) {
			let count = 0;
			for (let i = 0; i < countArray.length; i++) {
				if (countArray[i] === 1) count++;
			}
			if (count === 6) tempScore = 1500;
			if (tempScore > highScore) highScore = tempScore;
			tempDice = 6;
			if (tempDice > highDice) highDice = tempDice;
		}
		//-------

		//two triples or single triple with leftovers to score
		if (countArray.includes(3)) {
			let triplesCounter = 0;
			countArray.forEach((el) => {
				if (el === 3) triplesCounter++;
			});
			if (triplesCounter === 2) {
				tempScore = 2500;
				if (tempScore > highScore) highScore = tempScore;
				tempDice = 6;
				if (tempDice > highDice) highDice = tempDice;
			} else {
				let tripleIdx = countArray.indexOf(3);
				tempScore = (tripleIdx + 1) * 100;
				tempDice = 3;
				if (tripleIdx !== 0) {
					tempScore += countArray[0] * 100;
					tempDice += countArray[0];	
				} 
				if (tripleIdx !== 4) {
					tempScore += countArray[4] * 50;
					tempDice += countArray[4];
				}
				if (tempScore > highScore) highScore = tempScore;
				if (tempDice > highDice) highDice = tempDice;
			}
		}	
		//-------
		
		//five of a kind w/ or w/o extra 1s and 5s
		if (countArray.includes(5)) {
			tempScore = 2000;
			tempDice = 5;
			if (countArray.indexOf(5) !== 0) { 		//checks if the 5 of a kind is 1s. If not, for each 1, add 100 to roll count.
				if (countArray[0] === 1) {
					tempScore += 100;
					tempDice++;
				}
			}
			if (countArray.indexOf(5) !== 4) {
				if (countArray[4] === 1) {
					tempScore += 50;
					tempDice++;
				} 
			}
			if (tempScore > highScore) highScore = tempScore;
			if (tempDice > highDice) highDice = tempDice;
		} 
		//-------

		//four of a kind w/ or w/o extra 1s and 5s
		if (countArray.includes(4)) {
			tempScore = 1000;
			tempDice = 4;
			if (countArray.indexOf(4) !== 0) { 		//checks if the 5 of a kind is 1s. If not, for each 1, add 100 to roll count.
				tempScore += countArray[0] * 100;
				tempDice += countArray[0];
			}
			if (countArray.indexOf(4) !== 4) {
				tempScore += countArray[4] * 50;
				tempDice += countArray[4];
			}
			if (tempScore > highScore) highScore = tempScore;
			if (tempDice > highDice) highDice = tempDice;
		} 
		//-------

		//loose 5s and 1s

		if (numArray.includes(1) || numArray.includes(5)) {
			tempScore = (countArray[0] * 100) + (countArray[4] * 50);
			tempDice = countArray[0] + countArray[4];
			if (tempScore > highScore) highScore = tempScore;
			if (tempDice > highDice) highDice = tempDice;
		}
				
		this.rollScore = highScore;	
		this.diceScored += highDice;
	},
	checkFarkleOnRoll(diceArray) {
		let numArray = [];			//first part sanitizes incoming array so we are only working with numbers, not objects
		for (let i = 0; i < diceArray.length; i++) {
			if (diceArray[i] !== false && diceArray[i] !== null) {
				numArray.push(diceArray[i].value);
			}
		}
		let finalArray = numArray.sort(); //final array is the array of nums only
		if (finalArray.includes(1) || finalArray.includes(5)) { //if there are any 1s or 5s, there is no farkle
			return;
		} 
		const vals = [0, 0, 0, 0, 0, 0];

		for (let j = 0; j < finalArray.length; j++) {  //loops through incrementing vals so we know how many of each val are in the input array
														//once we know how many, we can check if there is 3 pair, or triplets or better.
			switch(finalArray[j]) {
				case 1: 
					vals[0]++;
					break;
				case 2:
					vals[1]++;
					break;
				case 3:
					vals[2]++;
					break;
				case 4:
					vals[3]++;
					break;
				case 5:
					vals[4]++;
					break;
				case 6:
					vals[5]++;
					break;
			}
		}
		let doubles = 0;

		for (let k = 0; k < vals.length; k++) {
			if (vals[k] === 2) {
				doubles++;
				if (doubles >= 3) {					//checks if there are 3 pairs
					return;
				}
			} else if (vals[k] >= 3) {
				return;	
			}
		};
		this.farkle();

	},
	farkle() {
		this.turnScore = 0;
		this.messageGen('farkle');
		setTimeout(() => {
			this.nextTurn();
		}, 2500);
	}, 
	winnerCheck() {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].score >= 10000) {
				$('#message').text(`${this.players[i].name} won the game!`);
				this.winner = true;
			}
		}
	}
}
	

//listeners

$('body').on('click', (event) => {
	if (event.target.innerText === 'Submit') {
		event.preventDefault();
		let numPlayers = $('input').val();
		if (numPlayers <= 8) {
			game.startGame(numPlayers);
			$('#outer-player-select')[0].style.visibility = 'hidden';
		} else {
			$('#prompt-text').text('Maximum: 8 players. Please try again.')
		}
	}

	if (event.target.innerText === 'How to Play') {
		if (!game.winner) {
			game.showInstructions();
		}
	}

	if (event.target.innerText === 'Roll') {
		if (!game.winner) {
			game.rollDice();
		}
	}

	if (event.target.innerText === 'End Turn') {
		if (!game.winner) {
			game.nextTurn();
		}
	}

	if (event.target.innerText === 'Restart Game') {
		game.resetGame();
		$('#outer-player-select')[0].style.visibility = 'visible';
		$('#prompt-text').text('Select number of players:')
	}

	if (event.target.tagName === 'IMG') {
		if (!game.winner) {
			game.manipulateDice(event.target.parentNode.id);
		}	
	}	
});



