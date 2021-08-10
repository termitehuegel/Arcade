//TODO Documentation and Comments
/**
 * @author ternitehuegel
 * @extends Game
 */
class TicTacToe extends Game {
    static name = 'Tic Tac Toe';
    playerTurn;
    field;
    win = '';
    ai;

    startGame(ai = false) {
        this.playerTurn = true;
        this.field = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
        this.ai = ai;
        this.win = '';
        super.startGame();
    }

    loadImages() {
        this.circle = new Image(this.canvas.width, this.canvas.width);
        this.circle.src = './img/ticTacToe/circle.png';
        this.cross = new Image(this.canvas.width, this.canvas.width);
        this.cross.src = './img/ticTacToe/cross.png';
        super.loadImages();
    }

    drawGame() {
        super.drawGame();

        for (let y=0; y<this.field.length; y++) {
            for (let x=0; x<this.field[y].length; x++) {
                //draws the grey squares
                this.context.fillStyle = '#ccc';
                this.context.fillRect(this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                //draws green squares if a player has won
                if (this.win !== '') {
                    this.drawWin();
                }
                //draws the according symbol on the tile
                if (this.field[y][x] === 1) {
                    this.context.fillStyle = '#00f';
                    //this.context.fillRect(this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    this.context.drawImage(this.cross, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                } else if (this.field[y][x] === 2) {
                    this.context.fillStyle = '#0f0';
                    //this.context.fillRect(this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    this.context.drawImage(this.circle, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                }
            }
        }
    }

    drawWin() {
        for (let p=1; p<3; p++){
            //checks rows
            for (let y=0; y<this.field.length; y++) {
                if (this.field[y][0] === p && this.field[y][1] === p && this.field[y][2] === p) {
                    this.context.fillStyle = '#0f0';
                    this.context.fillRect(this.canvas.width / 200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    this.context.fillRect(this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    this.context.fillRect(this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    switch (p) {
                        case 1:
                            this.context.drawImage(this.cross, this.canvas.width / 200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.cross, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.cross, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            break;
                        case 2:
                            this.context.drawImage(this.circle, this.canvas.width / 200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.circle, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.circle, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3*y + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            break;
                    }
                    return;
                }
            }
            //checks columns
            for (let x=0; x<this.field.length; x++) {
                if (this.field[0][x] === p && this.field[1][x] === p && this.field[2][x] === p) {
                    this.context.fillStyle = '#0f0';
                    this.context.fillRect(this.canvas.width/3*x + this.canvas.width/200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    this.context.fillRect(this.canvas.width/3*x + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    this.context.fillRect(this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                    switch (p) {
                        case 1:
                            this.context.drawImage(this.cross, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.cross, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.cross, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            break;
                        case 2:
                            this.context.drawImage(this.circle, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.circle, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            this.context.drawImage(this.circle, this.canvas.width/3*x + this.canvas.width/200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                            break;
                    }
                    return;
                }
            }
            //checks diagonal 1
            if (this.field[0][0] === p && this.field[1][1] === p && this.field[2][2] === p) {
                this.context.fillStyle = '#0f0';
                this.context.fillRect(this.canvas.width / 200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                this.context.fillRect(this.canvas.width / 3 + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                this.context.fillRect(this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                switch (p) {
                    case 1:
                        this.context.drawImage(this.cross, this.canvas.width / 200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.cross, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.cross, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        break;
                    case 2:
                        this.context.drawImage(this.circle, this.canvas.width / 200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.circle, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.circle, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        break;
                }
                return;
                //checks diagonal 2
            } else if (this.field[0][2] === p && this.field[1][1] === p && this.field[2][0] === p) {
                this.context.fillStyle = '#0f0';
                this.context.fillRect(this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                this.context.fillRect(this.canvas.width / 3 + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                this.context.fillRect(this.canvas.width / 200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                switch (p) {
                    case 1:
                        this.context.drawImage(this.cross, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.cross, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.cross, this.canvas.width / 200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        break;
                    case 2:
                        this.context.drawImage(this.circle, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width / 3 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.circle, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width / 200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        this.context.drawImage(this.circle, this.canvas.width / 200, this.canvas.width/3*2 + this.canvas.width/200, this.canvas.width/3 - this.canvas.width/100, this.canvas.width/3 - this.canvas.width/100);
                        break;
                }
                return;
            }
        }
    }

    /**
     * @description tires to click on a tile
     * @param x coordinate of the tile
     * @param y coordinate of tje tile
     */
    checkField(x, y) {
        if (this.field[y][x] === 0) {
            if (this.playerTurn) {
                this.field[y][x] = 1;
            } else {
                this.field[y][x] = 2;
            }
            this.playerTurn = !this.playerTurn;
            this.checkForEndOfGame();
            if (this.win !== '') {
                setTimeout(function () {
                    game.status = false;
                }, 700);
            }
        }
    }

    drawMenu() {
        super.drawMenu();

        this.context.textAlign = 'center';
        this.context.font = this.canvas.height/30 + 'px Arial';

        //draws play against player button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*3/6, this.canvas.width, this.canvas.height/30);

        //draws play against ai button
        this.context.fillRect(0, this.canvas.height*4/6, this.canvas.width, this.canvas.height/30);

        //draws play against player button text
        this.context.fillStyle = '#000';
        this.context.fillText('1 vs 1 | Player vs Player', this.canvas.width/2, this.canvas.height*3/6 + this.canvas.height/37, this.canvas.width);

        //draws play against ai button text
        this.context.fillText('Singleplayer | Player vs AI', this.canvas.width/2, this.canvas.height*4/6 + this.canvas.height/37, this.canvas.width);

        //draw winner text
        this.context.fillText(this.win, this.canvas.width / 2, this.canvas.height * 2 / 5);
    }

    clickEventHandler(e) {
        super.clickEventHandler(e);
        let rect = canvas.getBoundingClientRect();
        if (!game.status) {
            if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*3/6, canvas.width, canvas.height/30)) {
                game.startGame(false);
            } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*4/6, canvas.width, canvas.height/30)) {
                game.startGame(true);
            }
        } else {
            if (!(!game.playerTurn && game.ai)) {
                for (let y=0; y<game.field.length; y++) {
                    for (let x=0; x<game.field[y].length; x++) {
                        if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, canvas.width/3*x + canvas.width/200, canvas.width/3*y + canvas.width/200, canvas.width/3 - canvas.width/100, canvas.width/3 - canvas.width/100)) {
                            game.checkField(x, y);
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * @description sets win field and calls AI
     */
    checkForEndOfGame() {
        let winner = this.getWinner(this.field);
        //if somebody has won - set win field
        if (winner !== 0) {
            if (this.ai) {
                if (winner === 1) {
                    this.win = "You Win!";
                } else {
                    this.win = "You Lose!";
                }
            } else {
                this.win = "Player " + winner + " Wins!";
             }
        //if field is filled - Tie
        } else if (this.getFreeTiles(this.field).length === 0) {
            this.win = "Tie!";
        //if ai is enabled and it's the ais turn
        } else if (this.ai && !this.playerTurn) {
            //ai makes it turn
            this.aiTurn();
        }
    }

    /**
     * @description searches for Free tiles on a field
     * @param field the field/board that the tiles are on
     * @returns {*[]} the free tiles as an array of objects
     */
    getFreeTiles(field) {
        let freeTiles = [];
        for (let y = 0; y<field.length; y++){
            for (let x = 0; x<field[y].length; x++) {
                if (field[y][x] === 0) {
                    freeTiles.push({x: x, y: y});
                }
            }
        }
        return freeTiles;
    }

    /**
     * @description checks if someone has won
     * @param field the field/board that the tiles are on
     * @returns {number} the winner 0/1/2
     */
    getWinner(field) {
        //for player 1 and player 2
        for (let p=1; p<3; p++){
            //for every row
            for (let y=0; y<field.length; y++) {
                //if player has won the row
                if (field[y][0] === p && field[y][1] === p && field[y][2] === p) {
                    //returns the winner
                    return p;
                }
            }

            //for every column
            for (let x=0; x<field.length; x++) {
                //if player has won the column
                if (field[0][x] === p && field[1][x] === p && field[2][x] === p) {
                    //returns the winner
                    return p;
                }
            }

            //for diagonals
            if (field[0][0] === p && field[1][1] === p && field[2][2] === p) {
                //return winner
                return p;
            } else if (field[0][2] === p && field[1][1] === p && field[2][0] === p) {
                //return winner
                return p;
            }

        }
        //if no one has won: return 0
        return 0;
    }

    /**
     * @description the ai clicks a tile - to hopefully win
     */
    aiTurn() {
        //the free tiles - clickable
        let free = this.getFreeTiles(this.field);
        //the score of the best move - currently
        let maxScore = {score: -2, depth: Infinity};
        //the best move - currently
        let move;
        //clones the field
        let field = cloneTwoDimensionalArray(this.field);
        for (let i=0; i<free.length; i++) {
            //clicks a free tile
            field[free[i].y][free[i].x] = 2;
            //gets the score of the field after clicking the tile with miniMax
            let score = this.miniMax(field, false, 0);
            //resets the field to the live/real version
            field[free[i].y][free[i].x] = 0;
            //updates the maxScore and move if current move is better
            if (score.score > maxScore.score || (score.score === maxScore.score && score.depth < maxScore.depth)) {
                maxScore = score;
                move = free[i];
            }
        }
        //clicks the best tile
        this.checkField(move.x, move.y);
    }

    /**
     * @description gets the miniMax score of the given field and depth to the nearest win
     * @param field the field/board from that the score is to be calculated
     * @param max if miniMax should start with maximising
     * @param depth of the recursion
     * @returns {{score: number, depth: number}|{score: number, depth}} the score of the field
     */
    miniMax(field, max, depth) {
        //checks if someone won
        let winner = this.getWinner(field);
        //checks for free tiles
        let free = this.getFreeTiles(field);
        //the score of the best move - currently  - when maximising
        let maxScore = {score: -2, depth: Infinity};
        //the score of the best move - currently  - when minimizing
        let minScore = {score: 2, depth: Infinity};
        //if there is a winner
        if (winner !== 0) {
            //if the player has won
            if (winner === 1) {
                //score for losing: -1
                return {score: -1, depth: depth};
            //if the ai has won
            } else {
                //sore for winning: 1
                return {score: 1, depth: depth};
            }
        //if there are no free tiles
        } else if (free.length === 0) {
            //score for tie: 0
            return {score: 0, depth: depth};
        }
        //colones the field/board
        let field2 = cloneTwoDimensionalArray(field);

        //if maximising
        if (max) {
            for (let i=0; i<free.length; i++) {
                //clicks a free tile
                field2[free[i].y][free[i].x] = 2;
                //gets the score for the new board
                let score = this.miniMax(field2, false, depth + 1);
                //resets the field
                field2[free[i].y][free[i].x] = 0;
                //updates the maxScore if current score is better
                if (score.score > maxScore.score || (score.score === maxScore.score && score.depth < maxScore.depth)) {
                    maxScore = score;
                }
            }
            //return the score for maximising
            return maxScore;
        //if minimising
        } else {
            for (let i=0; i<free.length; i++) {
                //clicks a free tile
                field2[free[i].y][free[i].x] = 1;
                //gets the score for the new board
                let score = this.miniMax(field2, true, depth + 1);
                //resets the field
                field2[free[i].y][free[i].x] = 0;
                //updates the minScore if current score is better (lower)
                if (score.score < minScore.score || (score.score === minScore.score && score.depth < minScore.depth)) {
                    minScore = score;
                }
            }
            //returns the score for minimising
            return minScore;
        }
    }
}