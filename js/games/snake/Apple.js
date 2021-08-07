class Apple {
    x;
    y;
    color = '#f00';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    randomPosition(freePositions) {
        let pos = Math.floor(Math.random() * freePositions.length);
        pos = freePositions[pos];
        this.x = pos.x;
        this.y = pos.y;
    }
}