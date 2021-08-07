/**
 * @description the clickEventHandler for the dice game
 * @param {MouseEvent} e
 */
function diceClickHandler(e) {
    let rect = canvas.getBoundingClientRect();
    if (!game.inGame) {
        if (game.time == null|| game.time < Date.now() - 750) {
            if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height - 50, 80, 50)) {
            	//Ends the game if back to menu is clicked
                game.end();
            } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height * 2 / 3 - 30, canvas.width, 40)) {
            	//starts the game if play is clicked
                game.startGame();
			}
		}
	}
}

/**
 * @description the keypressEventHandler for the dice game
 * @param {KeyboardEvent} e
 */
function diceKeyHandler(e) {
	if (!game.inGame && (game.time == null|| game.time < Date.now() - 750)) {
		switch (e.key) {
			case 'Enter':
				game.startGame();
				break;
			case 'Backspace':
				game.end();
				break;
			case 'Escape':
				game.end();
				break;
			case ' ':
				game.startGame();
		}
	} else {
		if (game.startTime < Date.now() - 100) {
			if (game.playerNum == null) {
				//rolls the dice and generated the numbers
				game.rollDice();
			}
		}
	}

}

/**
 * @description Dice
 * @description press any button to roll the dice
 * @description the higher value wins
 * @extends Game
 */
class Dice extends Game{

	/**
	 * @type {string}
	 */
	static name = 'Würfeln';

	/**
	 * @type {null|int}
	 */
	playerNum;
	/**
	 * @type {null|int}
	 */
	aiNum;
	/**
	 * @type {boolean}
	 */
	inGame = false;
	/**
	 * @type {null|number}
	 */
	time;
	/**
	 * @type {null|number}
	 */
	startTime;
	/**
	 * @type {null|boolean}
	 */
	win;
	/**
	 * @type {int}
	 */
	shuffleIndexPlayer = 0;
	/**
	 * @type {int}
	 */
	shuffleIndexAi = 0;
	/**
	 * @type {int[]}
	 */
	shuffleList = [1,2,3,4,5,6];

	/**
	 * @constructor Dice
	 * @constructs Game
	 * @param {HTMLCanvasElement} canvas
	 * @param {CanvasRenderingContext2D} context
	 * @param {Arcade} arcade
	 */
	constructor(canvas, context, arcade) {
		//constructs a Game object
		super(canvas, context, arcade);
		//adds the Event listeners and Handlers
		this.canvas.addEventListener('click', diceClickHandler);
		document.addEventListener('keyup', diceKeyHandler);
	}

	/**
	 * @description ends the game and returns to menu
	 */
	end() {
		//removes the event handlers and listeners
		this.canvas.removeEventListener('click', diceClickHandler);
		document.removeEventListener('keyup', diceKeyHandler);
		//ends the game and returns to menu
		super.end();
	}

	/**
	 * @description updates the game
	 */
	update() {
        if (this.inGame || this.time > Date.now() - 700) {
            //draws the Game
            this.drawGame();
        } else {
            //draws the Game Menu
            this.drawMenu();
        }
    }

	/**
	 * @description starts the game
	 */
	startGame() {
		//resets all variables
		this.playerNum = null;
		this.time = null;
		this.aiNum = null;
		this.win = null;
		this.shuffleIndexPlayer = 0;
		this.shuffleIndexAi = 0;
		this.startTime = Date.now();
		this.inGame = true;
    }

	/**
	 * @description goes through a list and returns each value after the other
	 * @param {[]} list
	 * @returns {*}
	 */
	shufflePlayer(list) {
		if (list.length < 1) {
			//returns if tje array is empty
			return;
		}
		if (list.length <= this.shuffleIndexPlayer) {
			//resets the index, if it is out of bounds
			this.shuffleIndexPlayer = 0;
		}
		//gets the value of the index
		let result = list[this.shuffleIndexPlayer];
		//increases the index by one
		this.shuffleIndexPlayer++;
		//returns the result
		return result;
	}

	/**
	 * @description goes through a list and returns each value after the other
	 * @param {[]} list
	 * @returns {*}
	 */
	shuffleAi(list) {
		if (list.length < 1) {
			//returns if tje array is empty
			return;
		}
		if (list.length <= this.shuffleIndexAi) {
			//resets the index, if it is out of bounds
			this.shuffleIndexAi = 0;
		}
		//gets the value of the index
		let result = list[this.shuffleIndexAi];
		//increases the index by one
		this.shuffleIndexAi++;
		//returns the result
		return result;
	}

	/**
	 * @description generates the player and ai number and calculates who won
	 */
	rollDice() {
		//generates numbers
		this.playerNum = generateRandomNumberInRange(6, 1);
		this.aiNum = generateRandomNumberInRange(6, 1);

		//sees who has won
		if (this.playerNum > this.aiNum) {
			this.win = true;
		} else if (this.aiNum > this.playerNum) {
			this.win = false;
		} else {
			this.win = null;
		}
		//ends the game
		this.inGame = false;
		this.time = Date.now();
	}

	/**
	 * @description draws the game
	 */
	drawGame() {
		//clears the canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.context.font = '25px Arial';
        this.context.textAlign = 'center';
		this.context.fillStyle = '#bbb';

		//draws the dices
		this.context.fillRect(this.canvas.width/2-25, this.canvas.height*2/3-25, 50, 50);
		this.context.fillRect(this.canvas.width/2-25, this.canvas.height/3-25, 50, 50);

		//shows the button press prompt
		this.context.fillStyle = '#b5b5b5';
		if(this.playerNum == null && this.startTime < Date.now() -100) {
			this.context.fillText('Drücke eine beliebige Taste zum Würfeln', this.canvas.width/2, this.canvas.height/2);
		}

		//draws the dice names
		this.context.fillStyle = '#b5291f';
		this.context.fillText('Gegner', this.canvas.width/2, this.canvas.height/3 - 50);
		this.context.fillStyle = '#1b8016';
		this.context.fillText('Sie', this.canvas.width/2, this.canvas.height*2/3 - 50);

		//draws the numbers shown on the dice
		this.context.fillStyle = '#000';
		if (this.playerNum != null) {
			//draws the rolled numbers
			this.context.fillText(this.playerNum, this.canvas.width/2, this.canvas.height*2/3 +7);
			this.context.fillText(this.aiNum, this.canvas.width/2, this.canvas.height/3 +7);
		} else {
			//shows (random) numbers to make it look more appealing
			this.context.fillText(this.shufflePlayer(this.shuffleList), this.canvas.width/2, this.canvas.height*2/3 +7);
			this.context.fillText(this.shuffleAi(this.shuffleList), this.canvas.width/2, this.canvas.height/3 +7);
		}
		
	}

	/**
	 * @description draws the game menu
	 */
	drawMenu() {
        //clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draws header
        this.context.font = '50px Arial';
        this.context.fillStyle = '#000';
        this.context.textAlign = 'center';
        this.context.fillText(Dice.name, this.canvas.width/2, 50, this.canvas.width);

        //draws play button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*2/3 - 30, this.canvas.width, 40);

        //draws back to arcade menu button
        this.context.fillRect(0, this.canvas.height-50, 80, 50);

        //draws play against player button text
        this.context.font = '25px Arial';
        this.context.fillStyle = '#000';
        this.context.fillText('Spielen', this.canvas.width/2, this.canvas.height*2/3, this.canvas.width);


        //draws the winner text
        if (this.win != null) {
            if (this.win) {
            	//draws win
				this.context.fillText('Sie haben gewonnen!', this.canvas.width / 2, this.canvas.height * 2 / 5);
			} else {
            	//draws los
				this.context.fillText('Sie haben verloren!', this.canvas.width / 2, this.canvas.height * 2 / 5);
			}
        } else if (this.time != null) {
        	//draws tie
			this.context.fillText('Es kam zu einem Unentschieden!', this.canvas.width / 2, this.canvas.height * 2 / 5);
		}
		

        //draws back to arcade menu button text
        this.context.textAlign = 'left';
        this.context.fillText('Zurück', 2, this.canvas.height - 20, this.canvas.width);
    }
	
	
	
}