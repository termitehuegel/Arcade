function windowResizeEventHandler() {
   let height = window.innerHeight;
   let width = window.innerWidth;

   if (width < height) {
       canvas.width = width -20;
       canvas.height = width -20;
   } else {
       canvas.width = height -20;
       canvas.height = height -20;
   }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
//window resize listener
window.addEventListener('resize', windowResizeEventHandler)
windowResizeEventHandler();
//global variable because it is used in listeners
let game;
//name needs to be arcade because of listeners
let arcade = new Arcade([Dice, TicTacToe], canvas, ctx);
//draws the arcade menu for the first time
arcade.draw();