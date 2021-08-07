/**
 * @property {Game[]} games
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 */
class Arcade {
    /**
     * @type {Game[]}
     */
    games;
    /**
     * @type {int}
     */
    index;
    /**
     * @type {CanvasRenderingContext2D}
     */
    context;
    /**
     * @type {HTMLCanvasElement}
     */
    canvas;
    /**
     * @type{int}
     */
    updateInterval;

    /**
     * @constructor
     * @param {Game[]} games
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     */
    constructor(games, canvas, context) {
        this.games = games;
        this.index = 0;
        this.canvas = canvas;
        this.context = context;

        canvas.addEventListener("click", function(e){
            if (!blockblockListenersArcade) {
                let rect = canvas.getBoundingClientRect();
                if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*2/3 - 30, canvas.width, 40)) {
                    arcade.play();
                } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, canvas.width - 75, canvas.height * 2 / 5 - 35, 75, 35)) {
                    arcade.changeGame(1);
                } else if (clickInRect(e.clientX - rect.left, e.clientY - rect.top,0, canvas.height * 2 / 5 - 35, 75, 35)) {
                    arcade.changeGame(-1);
                }
            }
        });

        document.addEventListener('keyup', function (e) {
            if (!blockblockListenersArcade) {
                switch (e.key) {
                    case 'D':
                        arcade.changeGame(1);
                        break;
                    case 'd':
                        arcade.changeGame(1);
                        break;
                    case 'ArrowRight':
                        arcade.changeGame(1);
                        break;
                    case 'A':
                        arcade.changeGame(-1);
                        break;
                    case 'a':
                        arcade.changeGame(-1);
                        break;
                    case 'ArrowLeft':
                        arcade.changeGame(-1);
                        break;
                    case 'Enter':
                        arcade.play();
                        break;
                    case ' ':
                        arcade.play();
                        break;
                }
            }
        });
    }

    /**
     * @description draws the Arcade Menu
     */
    draw() {
        //clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draws header
        this.context.font = '50px Arial';
        this.context.fillStyle = '#000';
        this.context.textAlign = 'center';
        this.context.fillText(this.games[this.index].name, this.canvas.width/2, 50, this.canvas.width);

        //draws play button
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*2/3 - 30, this.canvas.width, 40);

        //draws play button text
        this.context.font = '25px Arial';
        this.context.fillStyle = '#000';
        this.context.fillText('Spielen', this.canvas.width/2, this.canvas.height*2/3, this.canvas.width);

        //draws arrow right
        if (typeof this.games[this.index + 1] !== 'undefined') {
            this.context.textAlign = 'right';
            this.context.font = '75px Arial';
            this.context.fillText('→', this.canvas.width, this.canvas.height * 2 / 5);
        }

        //draws arrow left
        if (typeof this.games[this.index - 1] !== 'undefined') {
            this.context.textAlign = 'left';
            this.context.font = '75px Arial';
            this.context.fillText('←', 0, this.canvas.height * 2 / 5);
        }
    }

    /**
     * @description changes the selected game by changing the index and drawing again
     * @param {int} difference the amount of steps the index should be increased/decreased
     * @returns {boolean} state of success
     */
    changeGame(difference) {
        if (typeof this.games[this.index + difference] === 'undefined') {
            return false;
        }
        this.index = this.index + difference;
        this.draw();
        return true;
    }

    /**
     * @description starts the selected game - game will be updated every 100ms
     * @constructs Game
     */
    play() {
        //blocks the Click listender of the Arcade
        blockblockListenersArcade = true;
        //creates the game - the parameter arcade is only to stop the game in the end -> the game should never do any thing else with it
        game = new this.games[this.index](this.canvas, this.context, this);
        //sets the field updateIntervall to the Intervall that updates the game
        this.updateInterval = setInterval(function () {
            //is called to update the game
            game.update()
        }, 100);
        document.title = 'Arcade - ' + this.games[this.index].name;
    }

    /**
     * @description ends a game and returns to the arcade menu - is called in a game object
     */
    end() {
        //ends the game updated
        clearInterval(this.updateInterval);
        //draws the arcade menu
        this.draw();
        //activates arcade inputs
        blockblockListenersArcade = false;
        document.title = 'Arcade - Menü';
    }
}