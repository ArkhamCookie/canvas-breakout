import { drawBall } from './ball.js'

const startButton = document.getElementById('startButton')
const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')

let ballX = canvas.width / 2
let ballY = canvas.height - 30

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	drawBall(ballX, ballY)

	ballX += 2
	ballY += -2
}

function startGame() {
	setInterval(draw, 10)
}

startButton.addEventListener('click', function () {
	startGame()
})
