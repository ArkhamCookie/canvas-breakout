import { drawBall } from './ball.js'
import { drawPaddle } from './paddle.js'

// Setup DOM
const startButton = document.getElementById('startButton')
const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
let intervalID

// Style Settings
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

// Difficulty Settings
let ballRadius = 10
let paddleWidth = 75
let paddleHeight = 10
let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20

// Ball Movement
let ballX = canvas.width / 2
let ballY = canvas.height - 30
let directionX = 2
let directionY = -2

// Controls
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false

// Setup Bricks
const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = []
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 }
	}
}

/** Draw Bricks */
function drawBricks() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			const brick = bricks[c][r]

			if (brick.status === 1) {
				const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
				const brickY = r * (brickHeight + brickPadding) + brickOffsetTop

				brick.x = brickX
				brick.y = brickY

				context.beginPath()
				context.rect(brickX, brickY, brickWidth, brickHeight)
				context.fillStyle = '#0095DD'
				context.fill()
				context.closePath()
			}
		}
	}
}

/** Detect Brick Collision */
function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			const brick = bricks[c][r]

			if (brick.status === 1) {
				if (ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
					directionY = -directionY
					brick.status = 0
				}
			}
		}
	}

}

/** Draw Screen */
function draw() {
	// Clear Screen (to allow redrawing of components)
	context.clearRect(0, 0, canvas.width, canvas.height)

	// Draw Game Components
	drawBall(ballX, ballY, ballRadius)
	drawPaddle(paddleWidth, paddleHeight, paddleX)
	drawBricks()
	collisionDetection()

	// Handle Ball Bouncing
	if (ballX + directionX > canvas.width - ballRadius || ballX + directionX < ballRadius) { // Hitting sides
		directionX = -directionX
	}
	if (ballY + directionY < ballRadius) { // Hitting top
		directionY = -directionY
	}
	if (ballY + directionY > canvas.height - ballRadius) { // Hitting Bottom (or paddle)
		if (ballX > paddleX && ballX < paddleX + paddleWidth) {
			directionY = -directionY
		} else {
			alert('Game Over!')
			document.location.reload()
			clearInterval(intervalID) // Needed for Chrome to end game
		}
	}

	// Handle Paddle Movement
	if (rightPressed) {
		paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
	}
	if (leftPressed) {
		paddleX = Math.max(paddleX - 7, 0)
	}

	// Handle Ball Movement
	ballX += directionX
	ballY += directionY
}

/**
 * Handle Pressing Keys for Controls
 * @param {object} event
 */
function keyDownHandler(event) {
	switch (event.key) {
		case "ArrowRight":
		case "d":
			rightPressed = true
			break
		case "ArrowLeft":
		case "a":
			leftPressed = true
			break
	}
}

/**
 * Handle Stopping Pressing Keys for Controls
 * @param {object} event
 */
function keyUpHandler(event) {
	switch (event.key) {
		case "ArrowRight":
		case "d":
			rightPressed = false
			break
		case "ArrowLeft":
		case "a":
			leftPressed = false
			break
	}
}

/** Start Game */
function startGame() {
	document.addEventListener("keydown", keyDownHandler)
	document.addEventListener("keyup", keyUpHandler)
	intervalID = setInterval(draw, 10)
}

startButton.addEventListener('click', function () {
	startGame()
	startButton.style.display = 'none'
})
