/**
 * @description handles click events  => checks for ending game
 * @param e
 */
function gameClickEventHandler(e) {
    if (!game.status) {
        let rect = canvas.getBoundingClientRect();
        ctx.font = canvas.height/15 + 'px Arial';
        if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height*14/15, ctx.measureText('Back').width + 8, canvas.height/15)) {
            game.end();
        }
    }
}
/**
 * @description handles key events => checks for ending game
 * @param e
 */
function gameKeyEventHandler(e) {
    if (!game.status) {
        if (e.key) {
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
}

/**
 * @property {string} name
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 * @property {Arcade} arcade
 * @property {boolean} status
 */
class Game {
    /**
     * @type {string} the name of the Game
     */
    static name;
    /**
     * @description true => in the game, false => in the menu
     * @type {boolean} the status of the game
     */
    status;

    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {Arcade} arcade
     */
    constructor(canvas, context, arcade) {
        this.canvas = canvas;
        this.context = context;
        this.arcade = arcade;
        //init event handlers
        document.addEventListener('keydown', gameKeyEventHandler);
        canvas.addEventListener('click', gameClickEventHandler);
    }

    /**
     * @description is called every 100ms to update the game
     */
    update() {

        this.draw();
    }

    /**
     * @description used to end the game
     */
    end() {
        document.removeEventListener('keydown', gameKeyEventHandler);
        canvas.removeEventListener('click', gameClickEventHandler);
        this.arcade.end();
    }

    startGame() {}

    draw() {
        //clears the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.status) {
            this.drawGame();
        } else {
            this.drawMenu();
        }
    }

    drawGame() {}

    drawMenu() {
        //draws header
        this.context.font = this.canvas.height/15 + 'px Arial';
        this.context.fillStyle = '#000';
        this.context.textAlign = 'center';
        this.context.fillText(this.constructor.name, this.canvas.width/2, this.canvas.height/15, this.canvas.width);

        //draws back to menu button
        this.context.font = this.canvas.height/15 + 'px Arial';
        this.context.fillStyle = '#bbb';
        this.context.fillRect(0, this.canvas.height*14/15, this.context.measureText('Back').width + 8, this.canvas.height/15);
        this.context.fillStyle = '#000';
        //draws back to arcade menu button text
        this.context.textAlign = 'left';
        this.context.fillText('Back', 2, this.canvas.height - this.canvas.height/100, this.canvas.width)
       ;
    }
}