/**
 * @property {string} name
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 * @property {Arcade} arcade
 */
class Game {
    /**
     * @type {string} the name of the Game
     */
    static name;

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
    }

    /**
     * @description is called every 100ms to update the game
     */
    update() {

    }

    /**
     * @description used to end the game
     */
    end() {
        this.arcade.end();
    }
}