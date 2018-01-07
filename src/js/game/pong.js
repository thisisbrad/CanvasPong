let canvas;
let canvasContext;

let ballX = 50;
let ballSpeedX = 15;
let ballY = 50;
let ballSpeedY = 15;

let playerPaddleY = 250;
let compPaddleY = 400;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calcualtePlayerPaddle(e) {
  console.log('this happened', e);
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseX = e.clientX - rect.left - root.scrollLeft;
  const mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = () => {
  console.log('MOUNTED');
  canvas = document.getElementById('pong');
  canvasContext = canvas.getContext('2d');
  const FPS = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / FPS);

  canvas.addEventListener('mousemove', e => {
    console.log('it moved');
    const mousePos = calcualtePlayerPaddle(e);
    compPaddleY = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX < 0) {
    if (ballY > playerPaddleY && ballY < playerPaddleY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      console.log('HIT');
    } else {
      // ballReset();
      ballSpeedX = -ballSpeedX;
    }
  }
  if (ballX >= canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  // BG
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // Player Paddle
  colorRect(10, playerPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  // AI Paddle
  colorRect(
    canvas.width - 20,
    compPaddleY,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    'white'
  );

  // Ball
  colorCircle(ballX, ballY, 10, 'greenyellow');
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function colorRect(x, y, w, h, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(x, y, w, h);
}

function colorCircle(x, y, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
