/**
 * @description returns if a position is in a given rectangle
 * @param {int} clickX
 * @param {int} clickY
 * @param {int} rectX
 * @param {int} rectY
 * @param {int} rectWidth
 * @param {int} rectHeight
 * @returns {boolean}
 */
function clickInRect(clickX, clickY, rectX, rectY, rectWidth, rectHeight) {
    return (rectX<clickX && clickX<(rectX+rectWidth) && rectY<clickY && clickY<(rectY + rectHeight));
}

/**
 * @description generates a random number in a range
 * @param {int} maximum - the maximum value of the generated number
 * @param {int} minimum - the minimum value of the generated number
 * @returns {number}
 */
function generateRandomNumberInRange(maximum, minimum) {
	return Math.floor(Math.random() * Math.floor(maximum) + minimum);
}