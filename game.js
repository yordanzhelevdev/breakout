var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var x = canvas.width / 2;
var dx = 2;
var y = canvas.height - 30;
var dy = -2;

//Bricks
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1
		};
	}
}

//Score 
var score = 0;

//Lives
var lives = 3;

//Bricks
function drawBricks() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;


				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = rgb;
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}


//random color
var rgb;

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return rgb = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.9 + ')';
}



var ballRadius = 10;

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = rgb;
	ctx.fill();
	ctx.closePath();
}

//Paddle
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function clear() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function draw() {
	// ctx.clearRect(0,0, canvas.width,canvas.height);
	drawBricks();
	drawBall();
	clear();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	x += dx;
	y += dy;

	if (y + dy < ballRadius) {
		dy = -dy;
		randomColor();
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
			if (dy > 0) {
				dy += 0.10;
			} else {
				dy -= 0.10;
			}
		} else {
			lives--;
			if (!lives) {
				alert("Game Over");
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dx - 2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}

	}

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx
		randomColor();

	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		console.log(canvas.width - paddleWidth);
		console.log(paddleX);
		paddleX += 7;

	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
		// console.log("paddleX: " + paddleX);
		// console.log("RelativeX: " + relativeX);
	}
}


function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}


//Collision. There i will check if the ball hit the bricks
function collisionDetection() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];

			if (b.status == 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					randomColor();
					dy = -dy;
					b.status = 0;
					score++;
					if (score == brickRowCount * brickColumnCount) {
						alert("You win. Congrats! \n You have destroyed :" + score + " bricks");
						document.location.reload();
					}
				}
			}

		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

draw();