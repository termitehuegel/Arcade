

class Minesweeper extends Game {
    static name = 'Minesweeper';
    static hardness = [
        {
            fieldSize: 10,
            bombCount: 10
        },
        {
            fieldSize: 16,
            bombCount: 40
        },
        {
            fieldSize: 21,
            bombCount: 99
        }];
    hardness;
    field;
    flagCount;
    start;
    win;
    score;
    shown;
    lost;

    startGame(hardness = 0) {
        this.hardness = hardness;
        this.field = this.generateField(hardness);
        this.start = false;
        this.win = 'YOU WON!';
        this.score = -1;
        this.shown = 0;
        this.lost = false;
        this.flagCount = 0;
        super.startGame();
    }

    loadImages() {
        this.bomb = new Image(this.canvas.width, this.canvas.width);
        this.bomb.src = './img/minesweeper/bomb.png';
        this.flag = new Image(this.canvas.width, this.canvas.width);
        this.flag.src = './img/minesweeper/flag.png';
        super.loadImages();
    }

    update() {
        super.update();
    }

    drawGame() {
        //TODO NUMBER SIZES FOR NORMAL AND EASY
        this.context.fillStyle = '#666';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.textAlign = 'center';
        this.context.font = this.canvas.height/30 + 'px Arial';

        for (let y = 0; y<this.field.length; y++) {
            for (let x = 0; x<this.field.length; x++) {
                if (this.field[y][x].show) {
                    //draws uncovered tiles
                    this.context.fillStyle = '#ddd';
                    this.context.fillRect(this.canvas.width/200 + x*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/200 + y*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100);
                    if (this.field[y][x].value > 0) {
                        //draws numbers of uncovered tiles
                        this.context.fillStyle = '#000';
                        this.context.fillText(this.field[y][x].value, this.canvas.width/45 + x*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/27 + y*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize);
                    }
                } else {
                    //draws not uncovered tiles
                    this.context.fillStyle = '#aaa';
                    this.context.fillRect(this.canvas.width/200 + x*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/200 + y*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100);
                    if (game.field[y][x].flag) {
                        //draws flags on flagged tiles
                        this.context.drawImage(this.flag, this.canvas.width/200 + x*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/200 + y*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100);
                    }
                }
                if (this.lost && this.field[y][x].value === -1) {
                    //draws the bomb tiles when the game is lost
                    this.context.fillStyle = '#f00';
                    this.context.fillRect(this.canvas.width/200 + x*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/200 + y*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100);
                    this.context.drawImage(this.bomb, this.canvas.width/200 + x*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/200 + y*this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100, this.canvas.width/Minesweeper.hardness[this.hardness].fieldSize - this.canvas.width/100);
                }
            }
        }

        super.drawGame();
    }

    drawMenu() {

        this.context.textAlign = 'center';
        this.context.font = this.canvas.height/30 + 'px Arial';
        //draws easy button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*5/9 - this.canvas.height/37, this.canvas.width, this.canvas.height/30);

        //draws medium button
        this.context.fillRect(0, this.canvas.height*6/9 - this.canvas.height/37, this.canvas.width, this.canvas.height/30);

        //draws hard button
        this.context.fillRect(0, this.canvas.height*7/9 - this.canvas.height/37, this.canvas.width, this.canvas.height/30);

        //draws easy button text
        this.context.fillStyle = '#000';
        this.context.fillText('Einfach', this.canvas.width/2, this.canvas.height*5/9, this.canvas.width);

        //draws medium button text
        this.context.fillText('Mittel', this.canvas.width/2, this.canvas.height*6/9, this.canvas.width);

        //draws hard button text
        this.context.fillText('Schwer', this.canvas.width/2, this.canvas.height*7/9, this.canvas.width);

        //draws the winner text
        this.context.fillText(this.win, this.canvas.width / 2, this.canvas.height * 2 / 5);

        super.drawMenu();
    }

    generateField(hardness) {
        let conditions = Minesweeper.hardness[hardness];
        let field = [];
        for (let y=0; y<conditions.fieldSize; y++) {
            let row = [];
            for (let x=0; x<conditions.fieldSize; x++) {
                row.push({value: 0, show: false, flag: false});
            }
            field.push(row);
        }
        field = this.generateBombs(conditions.bombCount, field);
        field = this.generateValues(field);
        return field;
    }

    generateBombs(amount, field) {
        //termination condition
        if (amount <= 0) {
            return field;
        }
        //generates random positions
        let yPos = Math.floor(Math.random() * field.length);
        let xPos = Math.floor(Math.random() * field.length);

        //checks if the tile is empty
        if (field[yPos][xPos].value === 0) {
            field[yPos][xPos].value = -1;
            return this.generateBombs(amount - 1, field);
        } else {
            return this.generateBombs(amount, field);
        }
    }

    generateValues(field) {
        for (let y=0; y<field.length; y++) {
            for (let x=0; x<field.length; x++) {
                if (field[y][x].value !== -1) {
                    let value = 0;

                    for (let yPos=-1; yPos<2; yPos++) {
                        for (let xPos=-1; xPos<2; xPos++) {
                            if (field[yPos + y] != null && field[yPos + y][xPos +x] != null && field[yPos + y][xPos +x].value === -1) {
                                value++;
                            }
                        }
                    }
                    field[y][x].value = value;
                }
            }
        }
        return field;
    }

    flagTile(x, y) {
        if (this.field[y][x].flag) {
            this.flagCount--;
            this.field[y][x].flag = false;
        } else if (this.flagCount < Minesweeper.hardness[this.hardness].bombCount) {
            this.flagCount++;
            this.field[y][x].flag = true;
        }
    }

    showTile(x, y) {
        //can't uncover flagged or already uncovered tiles
        if (!this.field[y][x].show && !this.field[y][x].show) {
            //starts the timer
            if (!this.start) {
                this.start = Date.now();
            }
            if (this.field[y][x].value === -1) {
                //lets the player loose if he uncovers a bomb
                this.lost = true;
                setTimeout( function () {
                    game.status = false;
                    game.win = 'YOU LOST!';
                }, 700);
            } else if (this.field[y][x].value > 0) {
                //uncovers a tile
                this.shown++;
                this.field[y][x].show = true;
            } else {
                //uncovers a tile and all adjacent tiles if the tile has no bordering bombs
                this.field[y][x].show = true;
                this.shown++;
                //uncovers adjacent tiles
                for (let yPos = -1; yPos < 2; yPos++) {
                    for (let xPos = -1; xPos < 2; xPos++) {
                        if (this.field[y + yPos] != null && this.field[y + yPos][x + xPos] != null) {
                            this.showTile(parseInt(x + xPos), parseInt(y + yPos));
                        }
                    }
                }
            }
            //wins if all tiles that aren't bombs were uncovered
            if (this.shown === Minesweeper.hardness[this.hardness].tileCount - Minesweeper.hardness[this.hardness].bombCount) {
                this.score = Math.floor((Date.now() - this.start)/1000);
                setTimeout(function () {
                    this.status = false;
                }, 700);
            }
        }
    }


    clickEventHandler(e) {
        super.clickEventHandler(e);
        let rect = canvas.getBoundingClientRect();
        if (!game.status) {
            if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*5/9 - canvas.height/37, canvas.width, canvas.height/30)) {
                game.startGame(0);
            } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*6/9 - canvas.height/37, canvas.width, canvas.height/30)) {
                game.startGame(1);
            } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*7/9 - canvas.height/37, canvas.width, canvas.height/30)) {
                game.startGame(2)
            }
        } else {

        }

    }


}