let canvas;
let canvasContext;

window.onload = () => {
  console.log('HOLLA');
  canvas = document.getElementById('pong');
  canvasContext = canvas.getContext('2d');
  drawEverything();
};

function drawEverything() {
  console.log('DRAWING');
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(100, 200, 50, 25);
  canvasContext.fillStyle = 'green';
  canvasContext.fillRect(140, 240, 10, 10);
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(500, 400, 50, 50);
}
