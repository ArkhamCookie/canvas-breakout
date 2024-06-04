import { drawBall } from './ball.js'
import { drawPaddle } from './paddle.js'

// Setup DOM
const startButton = document.getElementById('startButton')
const scoreDisplay = document.getElementById('score')
const livesDisplay = document.getElementById('lives')
const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
const ballColorSelector = document.getElementById('ballColorInput')
let intervalID

// Style Settings
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30
let ballColor = '#0095DD'
let paddleColor = '#0095DD'
let brickColor = '#0095DD'

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

// Game Vars
let score = 0
let lives = 3

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
				context.fillStyle = brickColor
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
					score++
					scoreDisplay.textContent = 'Score: ' + score

					if (score === brickRowCount * brickColumnCount) {
						alert("You Win!")
						document.location.reload()
						clearInterval(intervalID) // Needed for Chrome to end game
					}
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
	drawBall(ballX, ballY, ballRadius, ballColor)
	drawPaddle(paddleWidth, paddleHeight, paddleX, paddleColor)
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
			lives--
			livesDisplay.textContent = 'Lives: ' + lives
			if (lives <= 0) {
				alert('Game Over!')
				document.location.reload()
				clearInterval(intervalID) // Needed for Chrome to end game
			} else {
				ballX = canvas.width / 2
				ballY = canvas.height - 30
				directionX = 2
				directionY = -2
				paddleX = (canvas.width - paddleWidth) / 2
			}
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

/**
 * Handle Mouse Movement Controls
 * @param {object} event
 */
function mouseMoveHandler(event) {
	const relativeX = event.clientX - canvas.offsetLeft
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2
	}
}

/** Start Game */
function startGame() {
	document.addEventListener('mousemove', mouseMoveHandler)
	document.addEventListener('keydown', keyDownHandler)
	document.addEventListener('keyup', keyUpHandler)
	scoreDisplay.textContent = 'Score: 0'
	livesDisplay.textContent = 'Lives: 3'
	intervalID = setInterval(draw, 10)
}

// Setup Settings
ballColorSelector.addEventListener('change', function (event) {
	ballColor = event.target.value
})


startButton.addEventListener('click', function () {
	ballColor = ballColorSelector.value
	startGame()
	startButton.style.display = 'none'
})
