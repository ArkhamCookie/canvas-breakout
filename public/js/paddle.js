const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

/**
 * Draws paddle on canvas
 * @param {number} paddleWidth - Paddle width
 * @param {number} paddleHeight - Paddle height
 * @param {number} paddleX - Paddle (x) position
 * @param {string} paddleColor - Color of paddle
 */
function drawPaddle(paddleWidth, paddleHeight, paddleX, paddleColor) {
	context.beginPath()
	context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
	context.fillStyle = paddleColor
	context.fill()
	context.closePath()
}

export {
	drawPaddle
}
