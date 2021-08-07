//TODO FINISH

function snakeKeyEventHandler(e) {
    if (game.inGame) {
        switch (event.keyCode) {
            case 37:
                if (game.direction !== 2) {
                    game.direction = 0;
                }
                break;
            case 65:
                if (game.direction !== 2) {
                    game.direction = 0;
                }
                break;
            case 38:
                if (game.direction !== 3) {
                    game.direction = 1;
                }
                break;
            case 87:
                if (game.direction !== 3) {
                    game.direction = 1;
                }
                break;
            case 39:
                if (game.direction !== 0) {
                    game.direction = 2;
                }
                break;
            case 68:
                if (game.direction !== 0) {
                    game.direction = 2;
                }
                break;
            case 83:
                if (game.direction !== 1) {
                    game.direction = 3;
                }
                break;
            case 40:
                if (game.direction !== 1) {
                    game.direction = 3;
                }
                break;
        }
    } else {
        switch (e.key) {
            case 'Backspace':
                game.end();
                break;
            case 'Escape':
                game.end();
                break;
            default:
                game.startGame();
                break;
        }
    }
}

function snakeClickEventHandler(e) {
    if (!game.inGame) {
        let rect = canvas.getBoundingClientRect();
        if (clickInRect(e.clientX - rect.left, e.clientY - rect.top, 0, canvas.height - 50, 80, 50)) {
            game.end();
        }
    }
}



/**
 * @extends Game
 */
class Snake extends Game{
    /**
     * @type {string}
     */
    static name = 'Snake';
    /**
     * @type {number}
     */
    tableSize = 25;
    /**
     * @type {number}
     */
    x;
    /**
     * @type {number}
     */
    y ;
    /**
     * @type {string}
     */
    headColor;
    /**
     * @type {string}
     */
    color;
    /**
     * @type {number}
     */
    direction;
    /**
     * @type {[]}
     */
    tailList = [];
    /**
     * @type {boolean}
     */
    inGame;
    /**
     * @type {number}
     */
    score;
    /**
     * @type {Apple}
     */
    apple;

    end() {
        window.removeEventListener('keydown', snakeKeyEventHandler)
        window.removeEventListener('click', snakeClickEventHandler)
        super.end();
    }

    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.inGame) {
            //draw background
            for (let x = 0; x < this.tableSize; x++) {
                for (let y = 0; y < this.tableSize; y++) {
                    this.context.fillStyle = '#262626';
                    this.context.fillRect(24*x, 24*y, 24, 24);
                }
            }
            //temp
            let prev = {x: this.x, y: this.y}

            //update position
            switch (this.direction) {
                case 0:
                    this.x -= 1;
                    break;
                case 1:
                    this.y -= 1;
                    break;
                case 2:
                    this.x += 1;
                    break;
                case 3:
                    this.y += 1;
                    break;
            }
            //update tails
            for (let i in this.tailList) {
                let tmp = this.tailList[i];
                this.tailList[i] = prev;
                prev = tmp;
                if (tmp == {x: this.x, y: this.y}) {
                    this.inGame = true;
                }
            }
            //check for death by wall
            this.wall();

            for (let i in this.tailList) {
                let p = this.tailList[i];
                this.drawSnake(p.x, p.y, this.color);

                if (i == 0) {
                    if (p.x !== this.x) {
                        if (p.x > this.x) {
                            this.drawSnakeRest(p.x, p.y, this.color, 0, -4);
                        } else {
                            this.drawSnakeRest(p.x, p.y, this.color, 0, 4);
                        }
                    } else {
                        if (p.y > this.y) {
                            this.drawSnakeRest(p.x, p.y, this.color, -4, 0);
                        } else {
                            this.drawSnakeRest(p.x, p.y, this.color, 4, 0);
                        }
                    }
                } else {
                    console.log(this.tailList, i);
                    if (p.x != this.tailList[i-1].x) {
                        if (p.x > this.tailList[i-1].x) {
                            this.drawSnakeRest(p.x, p.y, this.color, 0, -4);
                        } else {
                            this.drawSnakeRest(p.x, p.y, this.color, 0, 4);
                        }
                    } else {
                        if (p.y > this.tailList[i-1].y) {
                            this.drawSnakeRest(p.x, p.y, this.color, -4, 0);
                        } else {
                            this.drawSnakeRest(p.x, p.y, this.color, 4, 0);
                        }
                    }

                }
            }

            if (this.apple.x == this.x && this.apple.y == this.y) {
                this.addTail();
                this.apple.randomPosition(this.getFreePos());
                this.score++;
            }

            this.drawSnake(this.x, this.y, this.headColor);
            ctx.drawImage(this.appleImg, this.apple.x*24, this.apple.y*20, this.appleImg.width, this.appleImg.height);
            //drawRect(apple.x, apple.y, apple.color);

        ctx.font = "20px Arial";
        ctx.fillStyle = '#fff';
        ctx.fillText("Score: " + this.score, 400, 18);
        ctx.fillText("Highscore: " + document.cookie, 10, 18);
        } else {
            if (document.cookie === "") {
                document.cookie = this.score.toString();
            }
            if (parseInt(document.cookie) < this.score) {
                document.cookie = this.score.toString();
            }
            ctx.font = "20px Arial";
            ctx.fillStyle = '#c00';
            ctx.fillText("YOU DIED", canvas.width*2/4-10, canvas.height/2);
            ctx.font = "20px Arial";
            ctx.fillStyle = '#ccc';
            ctx.fillText("PRESS ANY BUTTON TO RETRY", canvas.width/4, canvas.height*2/3);
            ctx.fillStyle = '#000';
            ctx.fillText("Score: " + this.score, canvas.width*3/4, canvas.height/4);
            ctx.fillText("Highscore: " + document.cookie, canvas.width/4, canvas.height/4);
        }
    }

    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {Arcade} arcade
     */
    constructor(canvas, context, arcade) {
        //construct Game
        super(canvas, context, arcade);
        //initialise click listeners
        this.canvas.addEventListener('click', snakeClickEventHandler);
        window.addEventListener('keydown', snakeKeyEventHandler);
        //initialize images
        this.appleImg = new Image(24, 24);
        this.appleImg.src = "./img/apple.png";
    }

    startGame() {
        this.y = 4;
        this.x = 4;
        this.headColor = '#090';
        this.color = '#0d0';
        this.direction = 2;
        this.score = 0;
        this.tailList = [];
        this.apple = new Apple(0, 0);
        this.apple.randomPosition(this.getFreePos());
        this.inGame = true;
    }

    wall() {
        if (this.x < 0 || this.y < 0) {
            this.inGame = false;
        } else if (this.x > this.tableSize - 1 || this.y > this.tableSize -1) {
            this.inGame = false;
        }
    }

    addTail(){
        this.tailList.push({x: this.x, y: this.y});
    }

    getFreePos() {
        let freePos = [];
        for (let x = 0; x < this.tableSize; x++) {
            for (let y = 0; y < this.tableSize; y++) {
                let flag = true;
                this.tailList.forEach(function (pos) {
                    if (pos.x === x && pos.y === y) {
                        flag = false;
                    }
                });
                if (this.x === x && this.y === y) {
                    flag = false;
                }
                if (flag) {
                    freePos.push({x: x, y: y});
                }
            }
        }
        return freePos;
    }

    drawSnake(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(24*x + 2, 24*y + 2, 24 -4, 24 -4);
    }

    drawSnakeRest(x, y, color, q, p) {
        ctx.fillStyle = color;
        ctx.fillRect(24*x + 2 + q, 24*y + 2 + p, 24 -4, 24 -4);
    }
}

/*
 * const canvas = document.getElementById('canvas');
 let ctx = canvas.getContext('2d');
 const tableSize = 25;
 let img = new Image(20, 20);
 img.src = 'img/apple.png';

 let soundDie = new Audio('sounds/die.mp3');
 let soundEat = new Audio('sounds/eat.mp3');

 class Apple {
    x = 0;
    y = 0;
    color = '#f00';

    randomPosition(freePositions) {
        let pos = Math.floor(Math.random() * freePositions.length);
        pos = freePositions[pos];
        this.x = pos.x;
        this.y = pos.y;
    }
}

 function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
 //Function to check whether a point is inside a rectangle
 function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

 class User {
    x = 0;
    y = 0;
	headColor = '#090';
    color = '#0d0';
    direction = 2;
    tailList = [];
    isAlive = true;
    score = 0;

    update() {
        let prev = {x: this.x, y: this.y}
        for (let i in this.tailList) {
            let tmp = this.tailList[i];
            this.tailList[i] = prev;
            prev = tmp;
        }


        switch (this.direction) {
            case 0:
                this.x -= 1;
                break;
            case 1:
                this.y -= 1;
                break;
            case 2:
                this.x += 1;
                break;
            case 3:
                this.y += 1;
                break;
        }
        this.x = this.loop(this.x);
        this.y = this.loop(this.y);

    }

    loop(value) {
        if (value < 0) {
            soundDie.play();
            user.isAlive = false;
            return 0;
        } else if (value > tableSize - 1) {
            soundDie.play();
            user.isAlive = false;
            return tableSize - 1;
        }
        return value;
    }

    addTail() {
        this.tailList.push({x: this.x, y: this.y});
    }

    getFreePos() {
        let freePos = [];
        for (let x = 0; x < tableSize; x++) {
            for (let y = 0; y < tableSize; y++) {
                let flag = true;
                this.tailList.forEach(function (pos) {
                    if (pos.x == x && pos.y == y) {
                        flag = false;
                    }
                });
                if (this.x == x && this.y == y) {
                    flag = false;
                }
                if (flag) {
                    freePos.push({x: x, y: y});
                }
            }
        }
        return freePos;
    }
}

 function  drawRect(x, y, color) {
    const size = 20;
    const padding = 0;

    ctx.beginPath();
    ctx.rect((size+padding)*x, (size+padding)*y, size, size);
    ctx.fillStyle = color;
    ctx.fill();
}

 function drawSnake(x, y, color) {
    const size = 20;
    const padding = 0;

    ctx.beginPath();
    ctx.rect((size+padding)*x + 2, (size+padding)*y + 2, size -4, size -4);
    ctx.fillStyle = color;
    ctx.fill();
}

 function drawSnakeRest(x, y, color, p, q) {
    const size = 20;
    const padding = 0;

    ctx.beginPath();
    ctx.rect((size+padding)*x + 2 + q, (size+padding)*y + 2 +p, size -4, size -4);
    ctx.fillStyle = color;
    ctx.fill();
}

 let user = new User();
 let apple = new Apple();
 apple.randomPosition(user.getFreePos());

 setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (user.isAlive) {

            for (let x = 0; x < tableSize; x++) {
                for (let y = 0; y < tableSize; y++) {
                    drawRect(x, y, '#262626');
                }
            }

            user.update();

			if (user.isAlive) {
				user.tailList.forEach(function (pos) {
					if (pos.x == user.x && pos.y == user.y) {
						soundDie.play();
						user.isAlive = false;
					}
				});

				for (let i in user.tailList) {
					let p = user.tailList[i];
					drawSnake(p.x, p.y, user.color);

					if (i == 0) {
						if (p.x != user.x) {
							if (p.x > user.x) {
								drawSnakeRest(p.x, p.y, user.color, 0, -4);
							} else {
								drawSnakeRest(p.x, p.y, user.color, 0, 4);
							}
						} else {
							if (p.y > user.y) {
								drawSnakeRest(p.x, p.y, user.color, -4, 0);
							} else {
								drawSnakeRest(p.x, p.y, user.color, 4, 0);
							}
						}
					} else {
						if (p.x != user.tailList[i-1].x) {
							if (p.x > user.tailList[i-1].x) {
								drawSnakeRest(p.x, p.y, user.color, 0, -4);
							} else {
								drawSnakeRest(p.x, p.y, user.color, 0, 4);
							}
						} else {
							if (p.y > user.tailList[i-1].y) {
								drawSnakeRest(p.x, p.y, user.color, -4, 0);
							} else {
								drawSnakeRest(p.x, p.y, user.color, 4, 0);
							}
						}

					}
				}

				if (user.x === apple.x && user.y === apple.y) {
					soundEat.play();
					user.addTail();
					apple.randomPosition(user.getFreePos());
					user.score++;
				}

				drawSnake(user.x, user.y, user.headColor);
				ctx.drawImage(img, apple.x*20, apple.y*20, img.width, img.height);
				//drawRect(apple.x, apple.y, apple.color);
			}
            ctx.font = "20px Arial";
            ctx.fillStyle = '#fff';
            ctx.fillText("Score: " + user.score, 400, 18);
            ctx.fillText("Highscore: " + document.cookie, 10, 18);
        } else {
            if (document.cookie == "") {
                document.cookie = user.score.toString();
            }
            if (parseInt(document.cookie) < user.score) {
                document.cookie = user.score.toString();
            }
            ctx.font = "20px Arial";
            ctx.fillStyle = '#c00';
            ctx.fillText("YOU DIED", canvas.width*2/4-10, canvas.height/2);
            ctx.font = "20px Arial";
            ctx.fillStyle = '#ccc';
            ctx.fillText("PRESS ANY BUTTON TO RETRY", canvas.width/4, canvas.height*2/3);
            ctx.fillStyle = '#000';
            ctx.fillText("Score: " + user.score, canvas.width*3/4, canvas.height/4);
            ctx.fillText("Highscore: " + document.cookie, canvas.width/4, canvas.height/4);
        }
}, 150);

 window.onkeydown = function (event) {
    if (user.isAlive) {
        switch (event.keyCode) {
            case 37:
                if (user.direction != 2) {
                    user.direction = 0;
                }
                break;
            case 65:
                if (user.direction != 2) {
                    user.direction = 0;
                }
                break;
            case 38:
                if (user.direction != 3) {
                    user.direction = 1;
                }
                break;
            case 87:
                if (user.direction != 3) {
                    user.direction = 1;
                }
                break;
            case 39:
                if (user.direction != 0) {
                    user.direction = 2;
                }
                break;
            case 68:
                if (user.direction != 0) {
                    user.direction = 2;
                }
                break;
            case 83:
                if (user.direction != 1) {
                    user.direction = 3;
                }
                break;
            case 40:
                if (user.direction != 1) {
                    user.direction = 3;
                }
                break;
        }
    } else {
        user = new User();
    }
 }

 canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (!user.isAlive) {
        if (isInside(mousePos, {x:canvas.width/4, y: canvas.height*2/3-20, width: 310, height: 20})) {
           user = new User();
        }
    }
}, false);
 */