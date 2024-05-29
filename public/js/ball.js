const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

/**
 * Draws a ball on canvas
 * @param {number} x - x coordinate of ball
 * @param {number} y - y coordinate of ball
 * @param {number} ballRadius - Radius of ball
 * @param {string} ballColor - Color of ball
 */
function drawBall(x, y, ballRadius, ballColor) {
	context.beginPath()
	context.arc(x, y, ballRadius, 0, Math.PI * 2)
	context.fillStyle = ballColor
	context.fill()
	context.closePath()
}

export {
	drawBall
}
