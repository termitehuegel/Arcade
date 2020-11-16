let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
//global variable because it is used in listeners
let blockblockListenersArcade = false;
//global variable because it is used in listeners
let game;
//name needs to be arcade because of listeners
let arcade = new Arcade([TicTacToe, Minesweeper, Dice], canvas, ctx);
//draws the arcade menu for the first time
arcade.draw();