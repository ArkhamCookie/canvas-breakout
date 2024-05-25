import { drawBall } from './ball.js'
import { drawPaddle } from './paddle.js'

const startButton = document.getElementById('startButton')
const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

const ballRadius = 10

let ballX = canvas.width / 2
let ballY = canvas.height - 30
let directionX = 2
let directionY = -2

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	drawBall(ballX, ballY)
	drawPaddle(10, 75)

	if (ballX + directionX > canvas.width - ballRadius || ballX + directionX < ballRadius) {
		directionX = -directionX
	}

	if (ballY + directionY > canvas.height - ballRadius || ballY + directionY < ballRadius) {
		directionY = -directionY
	}

	ballX += directionX
	ballY += directionY
}

function startGame() {
	setInterval(draw, 10)
}

startButton.addEventListener('click', function () {
	startGame()
	startButton.style.display = 'none'
})
