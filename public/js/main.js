import { drawBall } from './ball.js'
import { drawBricks } from './bricks.js'
import { drawPaddle } from './paddle.js'

// Setup DOM
const startButton = document.getElementById('startButton')
const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
let intervalID

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

/** Draw Screen */
function draw() {
	// Clear Screen (to allow redrawing of components)
	context.clearRect(0, 0, canvas.width, canvas.height)

	// Draw Game Components
	drawBall(ballX, ballY, ballRadius)
	drawPaddle(paddleWidth, paddleHeight, paddleX)
	drawBricks(brickRowCount, brickColumnCount, brickWidth, brickHeight)

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
