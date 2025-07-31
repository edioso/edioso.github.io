const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
const logoImg = new Image();
const GRID = 2;

let tileSize, board = [], empty = {};
let redirectSeconds = 1, countdownInterval;

// Carga imágenes
img.src = '../assets/sol3.jpg';
logoImg.src = '../assets/solar2.png'; // Asegúrate de que esta ruta sea correcta

// Espera a que ambas imágenes carguen
let imagesLoaded = 0;
[img, logoImg].forEach(image => {
  image.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
      setupCanvasSize();
      initBoard();
      shuffleBoard();
      drawBoard();
    }
  };
});

function setupCanvasSize() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  tileSize = Math.floor(size / GRID);
  canvas.width = tileSize * GRID;
  canvas.height = tileSize * GRID;
  ctx.imageSmoothingEnabled = false;
}

function initBoard() {
  board = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      board.push({ correctX: x, correctY: y, x, y });
    }
  }
  empty = board.pop(); // Último elemento es la ficha vacía
}

function shuffleBoard() {
  for (let i = 0; i < 100; i++) {
    const neighbors = board.filter(p =>
      Math.abs(p.x - empty.x) + Math.abs(p.y - empty.y) === 1
    );
    const n = neighbors[Math.floor(Math.random() * neighbors.length)];
    swap(n, empty);
  }
  board.push(empty); // Agrega la ficha vacía nuevamente
}

function swap(a, b) {
  [a.x, b.x] = [b.x, a.x];
  [a.y, b.y] = [b.y, a.y];
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  board.forEach(p => {
    const sx = p.correctX * tileSize;
    const sy = p.correctY * tileSize;
    const dx = p.x * tileSize;
    const dy = p.y * tileSize;

    if (p === empty) {
      // Dibuja el logo en el espacio vacío
      ctx.drawImage(logoImg, dx, dy, tileSize, tileSize);
    } else {
      // Dibuja parte del rompecabezas
      ctx.drawImage(img, sx, sy, tileSize, tileSize, dx, dy, tileSize, tileSize);
    }
  });
}

canvas.addEventListener('click', e => {
  const mx = Math.floor(e.offsetX / tileSize);
  const my = Math.floor(e.offsetY / tileSize);
  const clicked = board.find(p => p.x === mx && p.y === my);

  if (clicked && Math.abs(clicked.x - empty.x) + Math.abs(clicked.y - empty.y) === 1) {
    swap(clicked, empty);
    drawBoard();

    const isComplete = board.every(p => p.x === p.correctX && p.y === p.correctY);
    if (isComplete) startRedirectCountdown();
  }
});

window.addEventListener('resize', () => {
  if (!img.complete || !logoImg.complete) return;
  setupCanvasSize();
  drawBoard();
});

function startRedirectCountdown() {
  document.getElementById('countdown').style.display = 'block';
  let secs = redirectSeconds;
  document.getElementById('secs').textContent = secs;

  countdownInterval = setInterval(() => {
    secs--;
    document.getElementById('secs').textContent = secs;
    if (secs <= 0) {
      clearInterval(countdownInterval);
      window.location.href = '../html/home.html';
    }
  }, 1000);
}
