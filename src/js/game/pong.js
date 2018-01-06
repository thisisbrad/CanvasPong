let canvas;
let canvasContext;

let ballX = 50;
let ballSpeedX = 5;

window.onload = () => {
  console.log('MOUNTED');
  canvas = document.getElementById('pong');
  canvasContext = canvas.getContext('2d');
  const FPS = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / FPS);
};

function moveEverything() {
  console.log('MOVING');
  ballX = ballX + ballSpeedX;
}

function drawEverything() {
  console.log('DRAWING');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(10, 210, 10, 100);
  canvasContext.fillStyle = 'green';
  canvasContext.fillRect(ballX, 240, 10, 10);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(500, 400, 50, 50);
}
