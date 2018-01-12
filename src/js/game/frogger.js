const canvas = document.getElementById('frogger');
const ctx = canvas.getContext('2d');
// const GAME_WIDTH = window.innerWidth;
// const GAME_HEIGHT = window.innerHeight;
const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;
ctx.canvas.width = GAME_WIDTH;
ctx.canvas.height = GAME_HEIGHT;

console.log('frogger', ctx.canvas.width, ctx.canvas.height);

const player = {
  x: 10,
  y: GAME_HEIGHT / 2 - 60,
  speedX: 2,
  w: 63,
  h: 111,
  isMoving: false
};

const goal = {
  x: GAME_WIDTH - 180,
  y: GAME_HEIGHT / 2 - 60,
  w: 166,
  h: 157
};

const enemies = [
  {
    x: 180,
    y: 100,
    speedY: 1,
    w: 120,
    h: 105
  },
  {
    x: 440,
    y: 100,
    speedY: 2,
    w: 120,
    h: 105
  },
  {
    x: 700,
    y: 100,
    speedY: 3,
    w: 120,
    h: 105
  },
  {
    x: 880,
    y: 100,
    speedY: 2.2,
    w: 120,
    h: 105
  }
];

const load = new Promise(resolve => {
  resolve(true);
});

let alive = true;

const movePlayer = () => {
  player.isMoving = true;
};

const stopPlayer = () => {
  player.isMoving = false;
};

canvas.addEventListener('mousedown', movePlayer);
canvas.addEventListener('mouseup', stopPlayer);
canvas.addEventListener('touchstart', movePlayer);
canvas.addEventListener('touchend', stopPlayer);

const update = () => {
  if (player.isMoving) {
    player.x += player.speedX;
  }

  if (hitDection(player, goal)) {
    alive = false; // stop the game
    alert('You Won!');
    window.location = ''; // reload
  }

  enemies.forEach(enemy => {
    enemy.y += enemy.speedY;
    if (hitDection(player, enemy)) {
      alive = false; // stop the game
      alert('Game Over');
      window.location = ''; // reload
    }
    // check borders
    if (enemy.y <= 10) {
      enemy.y = 10;
      enemy.speedY *= -1;
    } else if (enemy.y >= GAME_HEIGHT - 105) {
      enemy.y = GAME_HEIGHT - 105;
      enemy.speedY *= -1;
    }
  });
};

const draw = () => {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Draws BG
  ctx.fillStyle = 'black'; // DEBUG
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // DEBUG
  // Draws Player
  ctx.fillStyle = 'rgba(180,240,0,0.5)'; // DEBUG
  ctx.fillRect(player.x, player.y, player.w, player.h); // DEBUG
  // Draw Enemy
  enemies.forEach((enemy, index) => {
    ctx.fillStyle = 'rgba(228,40,40,0.5)'; // DEBUG
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h); // DEBUG
  });
  // Draw Goal
};

const gameTimer = () => {
  update();
  draw();
  if (alive) {
    window.requestAnimationFrame(gameTimer);
  }
};

const hitDection = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    return true;
  }
  return false;
};

load.then(() => {
  console.dir(canvas);
  gameTimer();
});
