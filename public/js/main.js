import { drawBall } from './ball.js'
import { drawPaddle } from './paddle.js'

// Setup DOM
const startButton = document.getElementById('startButton')
const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

// Difficulty Settings
let ballRadius = 10
let paddleWidth = 75
let paddleHeight = 10

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

	// Handle Ball Bouncing
	if (ballX + directionX > canvas.width - ballRadius || ballX + directionX < ballRadius) {
		directionX = -directionX
	}
	if (ballY + directionY < ballRadius) {
		directionY = -directionY
	} else if (ballY + directionY > canvas.height - ballRadius) {
		alert('Game Over!')
		document.location.reload()
		clearInterval(interval) // Needed for Chrome to end game
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
	const interval = setInterval(draw, 10)
}

startButton.addEventListener('click', function () {
	startGame()
	startButton.style.display = 'none'
})
