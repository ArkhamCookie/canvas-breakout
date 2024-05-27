const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

function drawBricks(brickRowCount, brickColumnCount, brickWidth, brickHeight) {
	const bricks = []

	for (var c = 0; c < brickColumnCount; c++) {
		bricks[c] = []
		for (var r = 0; r < brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0 }
		}
	}

	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
			const brickY = r * (brickHeight + brickPadding) + brickOffsetTop

			bricks[c][r].x = brickX
			bricks[c][r].y = brickY

			context.beginPath()
			context.rect(brickX, brickY, brickWidth, brickHeight)
			context.fillStyle = "#0095DD"
			context.fill()
			context.closePath()
		}
	}
}

export {
	drawBricks
}
