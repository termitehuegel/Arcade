/**
 * @description the click event handler for minesweeper
 * @param {MouseEvent} e
 */
function minesweeperClickEventHandler(e) {
    let rect = canvas.getBoundingClientRect();
    if (game.inGame) {
        for (let x = 0; x < game.fieldSize; x++) {
            for (let y = 0; y < game.fieldSize; y++) {
                if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, x * (game.size + 1), y * (game.size + 1), game.size, game.size)) {
                    game.uncoverTile(x, y);
                    break;
                }
            }
        }
    } else {
        if (game.timeEnd == null || game.timeEnd < Date.now() - 2050) {
            if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height - 50, 80, 50)) {
                game.end();
            } else {
                for (let hardness = 0; hardness < 3; hardness++) {
                    if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height * (6 + hardness) / 9 - 30, canvas.width, 40)) {
                        game.startGame(hardness);
                        break;
                    }
                }
            }
        }
    }
}

/**
 * @description the keypressEventHandler for Minesweeper
 * @param {KeyboardEvent} e
 */
function minesweeperKeyHandler(e) {
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
 * @description the minesweeper right click event handler
 * @param {MouseEvent} e
 */
function minesweeperContextMenuEventHandler(e) {
    if (game.inGame) {
        let rect = canvas.getBoundingClientRect();
        for (let x = 0; x < game.fieldSize; x++) {
            for (let y = 0; y < game.fieldSize; y++) {
                if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, x*(game.size+1), y*(game.size+1), game.size, game.size)) {
                    game.flag(x, y);
                    break;
                }
            }
        }
    }
}

/**
 * @description prevents the browser from opening the context menu on right click
 * @param {MouseEvent} e
 */
function minesweeperContextMenuEventPreventDefault(e) {
    e.preventDefault();
}

/**
 * @description Minesweeper
 * @description right click to mark bombs
 * @description left click to uncover a tile
 * @description don't uncover bombs
 * @description you have won if all fields but the bombs are uncovered
 * @description the number on a tile shows how many bombs border on the tile
 * @extends Game
 */
class Minesweeper extends Game{

    /**
     * @type {string}
     */
    static name = 'Minesweeper';

    /**
     * @type {[{fieldSize: number, bombCount: number}, {fieldSize: number, bombCount: number}, {fieldSize: number, bombCount: number}]}
     */
    static hardness = [
        {
            fieldSize: 10,
            bombCount: 10
        }, {
            fieldSize: 16,
            bombCount: 40
        }, {
            fieldSize: 21,
            bombCount: 99
        }
    ];

    /**
     * @description the number of bombs the field has
     * @type  {int}
     */
    bombCount;
    /**
     * @description the number of rows/columns the field has
     * @type {int}
     */
    fieldSize;
    /**
     * @description the field with all tiles
     * @type {[][]}
     */
    field = [];
    /**
     * @type {boolean}
     */
    inGame = false;
    /**
     * @description the number of flags that are placed
     * @type {int}
     */
    flagCount = 0;
    /**
     * @description the number of currently uncovered tiles
     * @type {int}
     */
    uncoveredTileCount = 0;
    /**
     * @description the number of total tiles in the field (fieldSize*fieldSize)
     * @type {int}
     */
    tileCount;
    /**
     * @description the time needed to solve the puzzle
     * @description is negative if there is no score
     * @type {number}
     */
    score = -1;
    /**
     * @description the unix timestamp of the time when the first tile is uncovered
     * @type {number}
     */
    timeStart;
    /**
     * @description the unix timestamp of the end of the game
     * @type {null|number}
     */
    timeEnd = null;
    /**
     * @description the size of a tile in px
     * @type {number}
     */
    size;
    /**
     * @type {HTMLImageElement}
     */
    flagImg;
    /**
     * @type {HTMLImageElement}
     */
    bombImg;
    /**
     * @description if the player has won/lost
     * @type {null|boolean}
     */
    win = null;
    /**
     * @description the hardness of the puzzle
     * @type {int}
     */
    hardness;

    /**
     * @constructor Minesweeper
     * @constructs Game
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {Arcade} arcade
     */
    constructor(canvas, context, arcade) {
        super(canvas, context, arcade);
        //initializes the event handlers
        document.addEventListener('keyup', minesweeperKeyHandler);
        this.canvas.addEventListener('click', minesweeperClickEventHandler);
        this.canvas.addEventListener('contextmenu', minesweeperContextMenuEventHandler);
        this.canvas.addEventListener('contextmenu', minesweeperContextMenuEventPreventDefault);
    }

    /**
     * @param {int} hardness
     * @returns {boolean|undefined}
     */
    startGame(hardness) {
        // returns if the hardness is uncnown
        if (typeof Minesweeper.hardness[hardness] === 'undefined') {
            return false;
        }
        //resets some Variables
        this.uncoveredTileCount = 0;
        this.flagCount = 0;

        //sets some Variables
        this.hardness = hardness;
        this.bombCount = Minesweeper.hardness[hardness].bombCount;
        this.fieldSize = Minesweeper.hardness[hardness].fieldSize;
        this.tileCount = this.fieldSize * this.fieldSize;
        this.size = Math.floor(this.canvas.width/(this.fieldSize + 1));

        //loads the Images

        //nicht mein Bild - ich habe aber die Quelle vergessen - Das Bild ist aber sehr klar aus dem original Minesweeper
        this.flagImg = new Image(this.size, this.size);
        this.flagImg.src = 'img/flag.png';

        //src='https://www.freepngs.com/bomb-images?pgid=j1hkp6kc-45a0bb6d-5461-11e8-a9ff-063f49e9a7e4'
        this.bombImg = new Image(this.size, this.size);
        this.bombImg.src = 'img/bomb.png';

        //generates the mine field
        this.generateField();
        //starts the game => now the game can be drawn
        this.inGame = true;
    }

    /**
     * @description generates a minefield
     * @description fills the field field with tiles and bombs
     */
    generateField() {
		//resets the field (bug fix)
		this.field = [];
        //fills the field with empty tiles
        for (let x = 0; x<this.fieldSize; x++) {
            this.field[x] = [];
            for (let y = 0; y<this.fieldSize; y++) {
                this.field[x].push({value: 0, uncovered: false, flagged: false});
            }
        }
        //generates bombs at random positions in the field
        this.generateBombs(this.bombCount);
        //calculates and assigns the numbers to the tiles
        this.calculateNumbers();
    }

    /**
     * @description recursive
     * @description Generates a given number of bombs on the field
     * @description bombs are represented by a value of -1
     * @param {int} count number of bombs to generate
     */
    generateBombs(count) {
        //termination condition
        if (count <= 0) {
            return;
        }
        //generates random positions
        let yPos = Math.floor(Math.random() * this.fieldSize);
        let xPos = Math.floor(Math.random() * this.fieldSize);

        //checks if the tile is empty
        if (this.field[xPos][yPos].value === 0) {
            this.field[xPos][yPos].value = -1;
            this.generateBombs(count - 1);
        } else {
            this.generateBombs(count);
        }
    }

    /**
     * @description sets the value of a tile to the number of adjacent bombs
     */
    calculateNumbers() {
        for (let x = 0; x<this.fieldSize; x++) {
            for (let y = 0; y<this.fieldSize; y++) {
                if (this.field[x][y].value !== -1) {
                    //default value is 0
                    let value = 0;
                    //checks adjacent tiles
                    for (let xPos = -1; xPos < 2; xPos++) {
                        for (let yPos = -1; yPos < 2; yPos++) {
                            if (x + xPos >= 0 && y + yPos >= 0 && this.field[x + xPos] != null && this.field[x + xPos][y + yPos] != null) {
                                //increases the value if a bomb is found
                                if (this.field[x + xPos][y + yPos].value === -1) {
                                    value++;
                                }
                            }
                        }
                    }
                    //sets the value of the tile
                    this.field[x][y].value = value;
                }
            }
        }
    }

    /**
     * @description marks a tile as flagged/not flagged
     * @param {int} x the x-Coordinate of the tile
     * @param {int} y the y-Coordinate of the tile
     */
    flag(x, y) {
        //can only flag not uncovered tiles
        if (!this.field[x][y].uncovered) {
            if (this.field[x][y].flagged) {
                //removes flag
                this.field[x][y].flagged = false;
                this.flagCount--;
            } else if (this.flagCount < this.bombCount) {
                //adds flag
                this.field[x][y].flagged = true;
                this.flagCount++;
            }
        }
    }

    /**
     * @description uncovers a tile
     * @param {int} x the x-Coordinate of the tile
     * @param {int} y the y-Coordinate of the tile
     */
    uncoverTile(x, y) {
        //can't uncover flagged or already uncovered tiles
        if (!this.field[x][y].uncovered && !this.field[x][y].flagged) {
            //starts the timer
            if (this.uncoveredTileCount === 0) {
                this.timeStart = Date.now();
            }
            if (this.field[x][y].value === -1) {
                //lets the player loose if he uncovers a bomb
                this.inGame = false;
                this.win = false;
                this.score = -1;
                this.timeEnd = Date.now();
            } else if (this.field[x][y].value > 0) {
                //uncovers a tile
                this.field[x][y].uncovered = true;
                this.uncoveredTileCount++;
            } else {
                //uncovers a tile and all adjacent tiles if the tile has no bordering bombs
                this.field[x][y].uncovered = true;
                this.uncoveredTileCount++;
                //uncovers adjacent tiles
                for (let xPos = -1; xPos < 2; xPos++) {
                    for (let yPos = -1; yPos < 2; yPos++) {
                        if (x + xPos >= 0 && y + yPos >= 0 && this.field[x + xPos] != null && this.field[x + xPos][y + yPos] != null) {
                            this.uncoverTile(parseInt(x + xPos), parseInt(y + yPos));
                        }
                    }
                }
            }
            //wins if all tiles that aren't bombs were uncovered
            if (this.uncoveredTileCount === this.tileCount - this.bombCount) {
                this.score = Math.floor((Date.now() - this.timeStart)/1000);
                this.inGame = false;
                this.timeEnd = Date.now();
                this.win = true;
            }
        }
    }

    /**
     * @description gets the current highscore for the played difficulty
     * @returns {number} the highscore or -1 if the highscore is not set
     */
    getHighscore() {
        //if difficulty can exist
        if (!(this.hardness >= 0)) {
            return -1;
        }
        //get highscore out of localstorage
        let highscore = parseInt(window.localStorage.getItem('MinesweeperHighscore' + this.hardness.toString()));
        //if the highscore is set return it
        if (highscore > 0) {
            return highscore;
        }
        return -1;
    }

    /**
     * @description sets the current highscore fot the played difficulty
     */
    setHighscore() {
        //checks if the difficulty can exist
        if (!(this.hardness >= 0)) {
            return;
        }
        //gets the current highscore
        let currentHighscore = this.getHighscore();
        //updates the highscore if necessary
        if ((currentHighscore < 0 || currentHighscore > this.score ) && this.score > 0) {
            window.localStorage.setItem('MinesweeperHighscore' +  this.hardness.toString(), this.score.toString());
        }
    }

    /**
     * @description draws the menu of the game
     */
    drawMenu() {
        //clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draws header
        this.context.font = '50px Arial';
        this.context.fillStyle = '#000';
        this.context.textAlign = 'center';
        this.context.fillText(Minesweeper.name, this.canvas.width/2, 50, this.canvas.width);

        //draws easy button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*2/3 - 30, this.canvas.width, 40);

        //draws medium button
        this.context.fillRect(0, this.canvas.height*7/9 - 30, this.canvas.width, 40);

        //draws hard button
        this.context.fillRect(0, this.canvas.height*8/9 - 30, this.canvas.width, 40);

        //draws back to menu button
        this.context.fillRect(0, this.canvas.height-50, 80, 50);

        //draws easy button text
        this.context.font = '25px Arial';
        this.context.fillStyle = '#000';
        this.context.fillText('Einfach', this.canvas.width/2, this.canvas.height*2/3, this.canvas.width);

        //draws medium button text
        this.context.fillText('Mittel', this.canvas.width/2, this.canvas.height*7/9, this.canvas.width);

        //draws hard button text
        this.context.fillText('Schwer', this.canvas.width/2, this.canvas.height*8/9, this.canvas.width);

        //draws the winner text
        if (this.win != null) {
            if (this.win) {
                this.context.fillText('Sie haben gewonnen!', this.canvas.width / 2, this.canvas.height * 2 / 5);
            } else {
                this.context.fillText('Sie haben verloren!', this.canvas.width / 2, canvas.height * 2 / 5);
            }
        }

        //draws score text
        if (this.score < 0) {
            this.context.fillText('Score: ---', this.canvas.width/4, this.canvas.height/4 );
        } else {
            this.context.fillText("Score: " + this.score + 's', this.canvas.width / 4, this.canvas.height / 4);
        }

        //updates the highscore
        this.setHighscore();

        //draws highscore text
        if (this.getHighscore() < 0) {
            this.context.fillText('Highscore: ---', this.canvas.width*3/4, this.canvas.height/4 );
        } else {
            this.context.fillText("Highscore: " + this.getHighscore() + 's', this.canvas.width *3/ 4, this.canvas.height / 4, );
        }

        //draws back to arcade menu button text
        this.context.textAlign = 'left';
        this.context.fillText('Zurück', 2, this.canvas.height - 20, this.canvas.width)
    }

    /**
     * @description draws the current game state
     */
    drawGame() {
        //clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draws the background
        this.context.fillStyle = '#666';
        this.context.fillRect(0, 0, Math.floor((this.size+1)*this.fieldSize), Math.floor((this.size+1)*this.fieldSize));

        //sets font and text alignment
        this.context.textAlign = 'center';
        this.context.font = "20px Arial";

        for (let x = 0; x<this.fieldSize; x++) {
            for (let y = 0; y<this.fieldSize; y++) {
                if (this.field[x][y].uncovered) {
                    //draws uncovered tiles
                    this.context.fillStyle = '#ddd';
                    this.context.fillRect((this.size+1)*x, (this.size+1)*y, this.size, this.size);
                    if (this.field[x][y].value > 0) {
                        //draws numbers of uncovered tiles
                        this.context.fillStyle = '#000';
                        this.context.fillText(this.field[x][y].value, x*(this.size+1) + this.size/2, y*(this.size+1) + this.size/2 + 7);
                    }
                } else {
                    //draws not uncovered tiles
                    this.context.fillStyle = '#aaa';
                    this.context.fillRect((this.size + 1) * x, (this.size + 1) * y, this.size, this.size);
                    if (game.field[x][y].flagged) {
                        //draws flags on flagged tiles
                        this.context.drawImage(this.flagImg, x * (this.size + 1), y * (this.size + 1), this.flagImg.width, this.flagImg.height);
                    }
                }
                if (!this.inGame && !this.win && this.field[x][y].value === -1) {
                    //draws the bomb tiles when the game is lost
                    this.context.fillStyle = '#f00';
                    this.context.fillRect((this.size + 1) * x, (this.size + 1) * y, this.size, this.size);
                    this.context.drawImage(this.bombImg, x * (this.size + 1), y * (this.size + 1), this.bombImg.width, this.bombImg.height);
                }
            }
        }
    }

    /**
     * @description is called every 100ms to update the game
     */
    update() {
        if (this.inGame || this.timeEnd > Date.now() - 1500) {
            //draws the game
            this.drawGame();
        } else {
            //draws the game menu
            this.drawMenu();
        }
    }

    /**
     * @description is called to end the game and return to the arcade menu
     */
    end()  {
        //removes event handlers
        document.removeEventListener('keyup', minesweeperKeyHandler);
        this.canvas.removeEventListener('click', minesweeperClickEventHandler);
        this.canvas.removeEventListener('contextmenu', minesweeperContextMenuEventHandler);
        this.canvas.removeEventListener('contextmenu', minesweeperContextMenuEventPreventDefault);
        //ends the game
        super.end();
    }
}