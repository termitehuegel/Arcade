/**
 * @description the event handler for a tic tac toe game
 * @param {MouseEvent} e
 */
function ticTacToeClickHandler(e) {
    let rect = canvas.getBoundingClientRect();
    if (!game.inGame) {
        if (game.time == null|| game.time < Date.now() - 750) {
            if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height - 50, 80, 50)) {
                game.end();
            } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height * 2 / 3 - 30, canvas.width, 40)) {
                game.startGame(false);
            } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height * 5 / 6 - 30, canvas.width, 40)) {
                game.startGame(true);
            }
        }
    } else {
        if (game.ki && game.playersTurn !== 1) {
            return;
        }
        for (let y=0; y<game.field.length; y++) {
            for (let x=0; x<game.field[y].length; x++) {
                if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 2+102*x, 2+102*y, 100, 100)) {
                    game.checkField(x, y);
                    break;
                }
            }
        }
    }
}

/**
 * @description the keypressEventHandler for tic tac toe
 * @param {KeyboardEvent} e
 */
function ticTacToeKeyHandler(e) {
    if (!game.inGame) {
        switch (e.key) {
            case 'Backspace':
                game.end();
                break;
            case 'Escape':
                game.end();
                break;
        }
    }
}

/**
 * @extends Game
 */
class TicTacToe extends Game{

    /**
     * @type {string}
     */
    static name = 'Tic Tac Toe';
    /**
     * @type {boolean}
     */
    inGame = false;
    /**
     * @type {number}
     */
    playersTurn;
    /**
     * @type {int[][]}
     */
    field;
    /**
     * @type {number|null}
     */
    time = null;
    /**
     * @type {int|null}
     */
    win = null;
    /**
     * @type {boolean}
     */
    ki;


    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {Arcade} arcade
     */
    constructor(canvas, context, arcade) {
        //constructs a Game Object
        super(canvas, context, arcade);
        //initialises the click listener
        this.canvas.addEventListener('click', ticTacToeClickHandler);
        document.addEventListener('keyup', ticTacToeKeyHandler);
        //initialises the images
        this.cross = new Image(100, 100);
        this.cross.src = './img/cross.png';
        this.circle = new Image(100, 100);
        this.circle.src = './img/circle.png';
    }

    /**
     * @description ends the Tic Tac Toe game
     */
    end() {
        //removes the tic tac toe event listener
        this.canvas.removeEventListener('click', ticTacToeClickHandler);
        document.removeEventListener('keyup', ticTacToeKeyHandler);
        //ends the game - by calling the Game object
        super.end();
    }

    /**
     * @description is called every 100ms to update the game
     */
    update() {
        if (this.inGame || this.time > Date.now() - 700) {
            //draws the Field
            this.drawGame();
        } else {
            //draws the Game Menu
            this.drawMenu();
        }
    }

    /**
     * @description starts a new Tic Tac Toe game
     * @param  {boolean} ki
     */
    startGame(ki) {
        this.ki = ki;
        this.playersTurn = 1;
        this.field = [[0,0,0],[0,0,0],[0,0,0]];
        this.inGame = true;
    }

    /**
     * @description markes the tile with the according symbol
     * @param {int} x x-Coordinate of the tile
     * @param {int} y y-Coordinate of the tile
     */
    checkField(x, y) {
        //marks the field
        if (this.field[y][x] === 0) {
            this.field[y][x] = this.playersTurn;
            //changes to the other player
            if (this.playersTurn === 1) {
                this.playersTurn = 2;
            } else {
                this.playersTurn = 1;
            }
            //checks if the game has ended because of the move made
            this.checkEnd();
        }
    }

    /**
     * @description draws the game/field in the current state
     */
    drawGame() {
        //clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y=0; y<this.field.length; y++) {
            for (let x=0; x<this.field[y].length; x++) {
                //draws the grey squares
                this.context.fillStyle = '#ccc';
                this.context.fillRect(2 + 102*x, 2+ 102*y, 100, 100);
                //draws green squares if a player has won
                if (this.win > 0) {
                    this.drawWin();
                }
                //draws the according symbol on the tile
                if (this.field[y][x] === 1) {
                    this.context.drawImage(this.cross, 2 + 102*x, 2+ 102*y, 100, 100);
                } else if (this.field[y][x] === 2) {
                    this.context.drawImage(this.circle, 2 + 102 * x, 2 + 102 * y, 100, 100);
                }
            }
        }
    }

    /**
     * @description draws the winning tiles green
     */
    drawWin() {
        for (let p=1; p<3; p++){
            //checks rows
            for (let y=0; y<this.field.length; y++) {
                if (this.field[y][0] === p && this.field[y][1] === p && this.field[y][2] === p) {
                    this.context.fillStyle = '#0f0';
                    this.context.fillRect(2, 2+ 102*y, 100, 100);
                    this.context.fillRect(104, 2+ 102*y, 100, 100);
                    this.context.fillRect(206, 2+ 102*y, 100, 100);
                    switch (p) {
                        case 1:
                            this.context.drawImage(this.cross, 2, 2+ 102*y, 100, 100);
                            this.context.drawImage(this.cross, 104, 2+ 102*y, 100, 100);
                            this.context.drawImage(this.cross, 206, 2+ 102*y, 100, 100);
                            break;
                        case 2:
                            this.context.drawImage(this.circle, 2, 2+ 102*y, 100, 100);
                            this.context.drawImage(this.circle, 104, 2+ 102*y, 100, 100);
                            this.context.drawImage(this.circle, 206, 2+ 102*y, 100, 100);
                            break;
                    }
                    return;
                }
            }
            //checks columns
            for (let x=0; x<this.field.length; x++) {
                if (this.field[0][x] === p && this.field[1][x] === p && this.field[2][x] === p) {
                    this.context.fillStyle = '#0f0';
                    this.context.fillRect(2 + 102*x, 2, 100, 100);
                    this.context.fillRect(2 + 102*x, 104, 100, 100);
                    this.context.fillRect(2 + 102*x, 206, 100, 100);
                    switch (p) {
                        case 1:
                            this.context.drawImage(this.cross, 2 + 102*x, 2, 100, 100);
                            this.context.drawImage(this.cross, 2 + 102*x, 104, 100, 100);
                            this.context.drawImage(this.cross, 2 + 102*x, 206, 100, 100);
                            break;
                        case 2:
                            this.context.drawImage(this.circle, 2 + 102*x, 2, 100, 100);
                            this.context.drawImage(this.circle, 2 + 102*x, 104, 100, 100);
                            this.context.drawImage(this.circle, 2 + 102*x, 206, 100, 100);
                            break;
                    }
                    return;
                }
            }
            //checks diagonal 1
            if (this.field[0][0] === p && this.field[1][1] === p && this.field[2][2] === p) {
                this.context.fillStyle = '#0f0';
                this.context.fillRect(2, 2, 100, 100);
                this.context.fillRect(104, 104, 100, 100);
                this.context.fillRect(206, 206, 100, 100);
                switch (p) {
                    case 1:
                        this.context.drawImage(this.cross, 2, 2, 100, 100);
                        this.context.drawImage(this.cross, 104,104, 100, 100);
                        this.context.drawImage(this.cross, 206, 206, 100, 100);
                        break;
                    case 2:
                        this.context.drawImage(this.circle, 2, 2, 100, 100);
                        this.context.drawImage(this.circle, 104, 104, 100, 100);
                        this.context.drawImage(this.circle, 206, 206, 100, 100);
                        break;
                }
                return;
                //checks diagonal 2
            } else if (this.field[0][2] === p && this.field[1][1] === p && this.field[2][0] === p) {
                this.context.fillStyle = '#0f0';
                this.context.fillRect(206, 2, 100, 100);
                this.context.fillRect(104, 104, 100, 100);
                this.context.fillRect(2, 206, 100, 100);
                switch (p) {
                    case 1:
                        this.context.drawImage(this.cross, 104, 104, 100, 100);
                        this.context.drawImage(this.cross, 206, 2, 100, 100);
                        this.context.drawImage(this.cross, 2, 206, 100, 100);
                        break;
                    case 2:
                        this.context.drawImage(this.circle, 104, 104, 100, 100);
                        this.context.drawImage(this.circle, 206, 2, 100, 100);
                        this.context.drawImage(this.circle, 2, 206, 100, 100);
                        break;
                }
                return;
            }
        }
    }

    /**
     * @description draws the Game Menu
     */
    drawMenu() {
        //clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draws header
        this.context.font = '50px Arial';
        this.context.fillStyle = '#000';
        this.context.textAlign = 'center';
        this.context.fillText(TicTacToe.name, this.canvas.width/2, 50, this.canvas.width);

        //draws play against player button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*2/3 - 30, this.canvas.width, 40);

        //draws play against ai button
        this.context.fillRect(0, this.canvas.height*5/6 - 30, this.canvas.width, 40);

        //draws back to arcade menu button
        this.context.fillRect(0, this.canvas.height-50, 80, 50);

        //draws play against player button text
        this.context.font = '25px Arial';
        this.context.fillStyle = '#000';
        this.context.fillText('1 vs 1 | Spieler gegen Spieler', this.canvas.width/2, this.canvas.height*2/3, this.canvas.width);

        //draws play against ai button text
        this.context.fillText('Einzelspieler | Spieler gegen KI', this.canvas.width/2, this.canvas.height*5/6, this.canvas.width);

        //draws the winner text
        if (this.win != null) {
            if (this.win === 0) {
                this.context.fillText('Es kam zu einem Unentschieden!', this.canvas.width / 2, this.canvas.height * 2 / 5);
            } else if (this.ki) {
                if (this.win === 1) {
                    this.context.fillText('Sie haben gewonnen!', this.canvas.width / 2, this.canvas.height * 2 / 5);
                } else {
                    this.context.fillText('Sie haben verloren!', this.canvas.width / 2, canvas.height * 2 / 5);
                }
            } else {
                this.context.fillText('Spieler '+ this.win + ' hat gewonnen!', this.canvas.width / 2, this.canvas.height * 2 / 5);
            }
        }

        //draws back to arcade menu button text
        this.context.textAlign = 'left';
        this.context.fillText('Zurück', 2, this.canvas.height - 20, this.canvas.width);
    }


    /**
     * @description checks if a player has won the game
     * @returns {int} 0 if the game is running - 1/2 if the according player has won
     */
    checkForWin() {
        for (let p=1; p<3; p++){
            for (let y=0; y<this.field.length; y++) {
                if (this.field[y][0] === p && this.field[y][1] === p && this.field[y][2] === p) {
                    return p;
                }
            }

            for (let x=0; x<this.field.length; x++) {
                if (this.field[0][x] === p && this.field[1][x] === p && this.field[2][x] === p) {
                    return p;
                }
            }

            if (this.field[0][0] === p && this.field[1][1] === p && this.field[2][2] === p) {
                return p;
            } else if (this.field[0][2] === p && this.field[1][1] === p && this.field[2][0] === p) {
                return p;
            }

        }
        return 0;
    }

    /**
     * @description checks if all fields are filled
     * @returns {boolean} true if all fields are filled
     */
    checkEndFieldFilled() {
        let flag = true;
        for (let y=0; y<this.field.length; y++) {
            for (let x=0; x<this.field[y].length; x++) {
                if (this.field[y][x] === 0) {
                    flag = false;
                }
            }
        }
        return flag;
    }

    /**
     * @description checks if the game has ended and calls the ki if it needs to move
     */
    checkEnd() {
        if (this.checkForWin() !== 0) {
            this.win = this.checkForWin();
            this.time = Date.now();
            this.inGame = false;
            return;
        }

        if (this.checkEndFieldFilled()) {
            this.win = 0;
            this.time = Date.now();
            this.inGame = false;
            return;
        }
        if (this.ki && this.playersTurn === 2) {
            this.cpu();
        }
    }

    /**
     * @description lets the ki know it needs to move
     */
    cpu() {
        //searches for a possibility to win
        //then looks if the opponent can win
        for (let p=3; p>0; p--){
            //checks rows for possible wins
            for (let y=0; y<this.field.length; y++) {
                if (this.field[y][0] === 0  && this.field[y][1] === p && this.field[y][2] === p) {
                    this.checkField(0, y);
                    return;
                } else if (this.field[y][0] === p  && this.field[y][1] === 0 && this.field[y][2] === p) {
                    this.checkField(1, y);
                    return;
                } else  if (this.field[y][0] === p  && this.field[y][1] === p && this.field[y][2] === 0) {
                    this.checkField(2, y);
                    return;
                }
            }
            //checks columns for possible wins
            for (let x=0; x<this.field.length; x++) {
                if (this.field[0][x] === 0 && this.field[1][x] === p && this.field[2][x] === p) {
                    this.checkField(x, 0);
                    return;
                } else if (this.field[0][x] === p && this.field[1][x] === 0 && this.field[2][x] === p) {
                    this.checkField(x, 1);
                    return;
                } else if (this.field[0][x] === p && this.field[1][x] === p && this.field[2][x] === 0) {
                    this.checkField(x, 2);
                    return;
                }
            }
            //checks diagonals for possible win
            if (this.field[0][0] === 0 && this.field[1][1] === p && this.field[2][2] === p) {
                this.checkField(0, 0);
                return;
            } else if (this.field[0][0] === p && this.field[1][1] === 0 && this.field[2][2] === p) {
                this.checkField(1, 1);
                return;
            } else if (this.field[0][0] === p && this.field[1][1] === p && this.field[2][2] === 0) {
                this.checkField(2, 2);
                return;
            } else if (this.field[0][2] === 0 && this.field[1][1] === p && this.field[2][0] === p) {
                this.checkField(2, 0);
                return;
            } else if (this.field[0][2] === p && this.field[1][1] === 0 && this.field[2][0] === p) {
                this.checkField(0, 0);
                return;
            } else if (this.field[0][2] === p && this.field[1][1] === p && this.field[2][0] === 0) {
                this.checkField(0, 2);
                return;
            }
        }
        //places in the center if opponent goes for a corner
        if (this.field[1][1] === 0 &&(this.field[0][0] === 1 || this.field[0][2] === 1 || this.field[2][0] === 1 || this.field[2][2] === 1)) {
            this.checkField(1, 1);
            return;
        }
        //goes for a corner if the opponent goes for the center
        if (this.field[1][1] === 1) {
            if (this.field[0][2] === 0) {
                this.checkField(2, 0);
                return;
            } else if (this.field[0][0] === 0) {
                this.checkField(0, 0);
                return;
            } else if (this.field[2][0] === 0) {
                this.checkField(0, 2);
                return;
            } else if (this.field[2][2] === 0) {
                this.checkField(2, 2);
                return;
            }
        }
        //goes for a not corner and not center tile if opponent has the corners of a diagonal
        if ((this.field[0][0] === 1 && this.field[2][2] === 1) || (this.field[0][2] === 1 && this.field[2][0] === 1)) {
            if (this.field[0][1] === 0) {
                this.checkField(1, 0);
                return;
            } else if (this.field[2][1] === 0) {
                this.checkField(1, 2);
                return;
            } else if (this.field[1][0] === 0) {
                this.checkField(0, 1);
                return;
            } else if (this.field[1][2] === 0) {
                this.checkField(1, 2);
                return;
            }

        }
        //goes for the middle tile if possible
        if (this.field[1][1] === 0) {
            this.checkField(1, 1);
            return;
        }

        //goes for a adjacent corner if opponent neither goes for the center nor for a corner tile
        for (let i=0; i<3; i=i+2) {
            //checks rows
            if (this.field[i][0] !== 2 && this.field[i][2] !== 2) {
                if (this.field[i][1] === 1) {
                    if (this.field[i][0] === 0) {
                        this.checkField(0, i);
                        return;
                    } else if (this.field[i][2] === 0) {
                        this.checkField(2, i);
                        return;
                    }
                }
            }
            //check columns
            if (this.field[0][i] !== 2 && this.field[2][i] !== 2) {
                if (this.field[1][i] === 1) {
                    if (this.field[0][i] === 0) {
                        this.checkField(i, 0);
                        return;
                    } else if (this.field[2][i] === 0) {
                        this.checkField(i, 2);
                        return;
                    }
                }
            }
        }
        //if no condition applies: choose a random free tile
        let tile = this.getRandomTile(this.getFreeTiles());
        this.checkField(tile.x, tile.y);

    }
    /**
     * @description gets the cords of all free tiles
     * @returns {map[]} returns an array of maps
     */
    getFreeTiles() {
        let freeTiles = [];
        for (let y = 0; y<this.field.length; y++){
            for (let x = 0; x<this.field[y].length; x++) {
                if (this.field[y][x] === 0) {
                    freeTiles.push({x: x, y: y});
                }
            }
        }
        return freeTiles;
    }

    /**
     * inspired by https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random
     * @param {map[]} tiles
     * @returns {map} returns a random tile out of the tile array
     */
    getRandomTile(tiles) {
        let index = Math.floor(Math.random() * tiles.length);
        return tiles[index];
    }
}