const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

/**
 * Draws paddle on canvas
 * @param {number} paddleWidth
 * @param {number} paddleHeight
 */
function drawPaddle(paddleWidth, paddleHeight) {
	let paddleX = (canvas.width - paddleWidth) / 2

	context.beginPath()
	context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
	context.fillStyle = '#0095DD'
	context.fill()
	context.closePath()
}

export {
	drawPaddle
}
