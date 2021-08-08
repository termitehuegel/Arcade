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

    checkForEndOfGame() {
        let winner = this.getWinner(this.field);
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
        } else if (this.getFreeTiles(this.field).length === 0) {
            this.win = "Tie!";
        } else if (this.ai && !this.playerTurn) {
            this.aiTurn();
        }
    }

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

    getWinner(field) {
        for (let p=1; p<3; p++){
            for (let y=0; y<field.length; y++) {
                if (field[y][0] === p && field[y][1] === p && field[y][2] === p) {
                    return p;
                }
            }

            for (let x=0; x<field.length; x++) {
                if (field[0][x] === p && field[1][x] === p && field[2][x] === p) {
                    return p;
                }
            }

            if (field[0][0] === p && field[1][1] === p && field[2][2] === p) {
                return p;
            } else if (field[0][2] === p && field[1][1] === p && field[2][0] === p) {
                return p;
            }

        }
        return 0;
    }

    aiTurn() {
        let free = this.getFreeTiles(this.field);
        let maxScore = -2;
        let move;
        for (let i=0; i<free.length; i++) {
            let field = cloneTwoDimensionalArray(this.field);
            field[free[i].y][free[i].x] = 2;
            let score = this.miniMax(field, false);
            field[free[i].y][free[i].x] = 0;
            if (score > maxScore) {
                maxScore = score;
                move = free[i];
            }
        }
        console.log(maxScore);
        this.checkField(move.x, move.y);
    }

    miniMax(field, max) {
        let winner = this.getWinner(field);
        let free = this.getFreeTiles(field);
        let maxScore = -2;
        let minScore = 2;
        if (winner !== 0) {
            if (winner === 1) {
                return -1;
            } else {
                return 1;
            }
        } else if (free.length === 0) {
            return 0;
        }
        let field2 = cloneTwoDimensionalArray(field);

        if (max) {
            for (let i=0; i<free.length; i++) {
                field2[free[i].y][free[i].x] = 2;
                let score = this.miniMax(field2, false);
                field2[free[i].y][free[i].x] = 0;
                if (score > maxScore) {
                    maxScore = score;
                }
            }
            //console.log('max', maxScore);
            return maxScore;
        } else {
            for (let i=0; i<free.length; i++) {
                field2[free[i].y][free[i].x] = 1;
                let score = this.miniMax(field2, true);
                field2[free[i].y][free[i].x] = 0;
                if (score < minScore) {
                    minScore = score;
                }
            }
            //console.log('min', minScore);
            return minScore;
        }
    }
}