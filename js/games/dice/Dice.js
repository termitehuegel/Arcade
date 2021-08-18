/**
 * @author termitehuegel
 * @extends Game
 */
class Dice extends Game {
    static name = "Dice";
    playerNumber;
    aiNumber;
    stopped;
    win = "";

    startGame() {
        this.stopped = false;
        this.win = '';
        super.startGame();
    }

    update() {
        if (this.status) {
            if (!this.stopped) {
                this.roll();
            }
        }
        super.update();
    }

    /**
     * @description rolls the dies
     */
    roll() {
        this.playerNumber = generateRandomNumberInRange(6, 1);
        this.aiNumber = generateRandomNumberInRange(6, 1);
    }

    /**
     * @description stopps the dies
     */
    stop() {
        this.soundClick.play();
        this.stopped = true;
        this.roll();
        setTimeout(function () {
            game.winner();
            game.status = false;
        }, 700);
    }

    /**
     * @description calculates the winning message
     * @returns {string}
     */
    winner() {
        if (this.playerNumber > this.aiNumber) {
            this.soundWin.play();
            this.win = 'You Win!';
        } else if (this.playerNumber < this.aiNumber) {
            this.soundLose.play();
            this.win = 'You Lose!';
        } else if (this.aiNumber != null && this.playerNumber != null){
            this.soundTie.play();
            this.win = 'Tie!';
        }
    }

    drawGame() {
        this.context.font = this.canvas.height/30 + 'px Arial';
        this.context.textAlign = 'center';
        this.context.fillStyle = '#bbb';

        //draws the dices
        this.context.fillRect(this.canvas.width/2 - this.canvas.height/65, this.canvas.height*2/3, this.canvas.width/30, this.canvas.width/30);
        this.context.fillRect(this.canvas.width/2 - this.canvas.height/65, this.canvas.height/3, this.canvas.width/30, this.canvas.width/30);

        //shows the button press prompt
        this.context.fillStyle = '#b5b5b5';
        this.context.fillText('Press Any Button To Stop!', this.canvas.width/2, this.canvas.height/2);


        //draws the dice names
        this.context.fillStyle = '#b5291f';
        this.context.fillText('CPU', this.canvas.width/2, this.canvas.height/3 - this.canvas.height/40);
        this.context.fillStyle = '#1b8016';
        this.context.fillText('YOU', this.canvas.width/2, this.canvas.height*2/3 - this.canvas.height/40);

        //draws the numbers shown on the dice
        this.context.fillStyle = '#000';
        this.context.fillText(this.playerNumber, this.canvas.width/2, this.canvas.height*2/3 + this.canvas.height/35);
        this.context.fillText(this.aiNumber, this.canvas.width/2, this.canvas.height/3 + this.canvas.height/35);

        super.drawGame();
    }

    drawMenu() {
        super.drawMenu();

        this.context.textAlign = 'center';
        this.context.font = this.canvas.height/30 + 'px Arial';

        //draw winner text
        this.context.fillText(this.win, this.canvas.width / 2, this.canvas.height * 2 / 5);

        //draws play button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*2/3, this.canvas.width, this.canvas.height/30);
        //draws play button text
        this.context.fillStyle = '#000';
        this.context.fillText('Play', this.canvas.width/2, this.canvas.height*2/3 + this.canvas.height/37, this.canvas.width);
    }

    clickEventHandler(e) {
        let rect = canvas.getBoundingClientRect();
        if (!game.status) {
            if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*2/3, canvas.width, canvas.height/30)) {
                game.startGame();
            }
            super.clickEventHandler(e);
        } else {
            if (!game.stopped) {
                game.stop();
            }
        }
    }

    keyEventHandler(e) {
        super.keyEventHandler(e);
        if (game.status) {
            if (!game.stopped) {
                game.stop();
            }
        }
    }

}