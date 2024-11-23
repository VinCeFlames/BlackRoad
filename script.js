// script.js

// Canvas setup
const starsCanvas = document.getElementById('stars');
const retrowaveCanvas = document.getElementById('retrowave');
const starsCtx = starsCanvas.getContext('2d');
const retroCtx = retrowaveCanvas.getContext('2d');

function setCanvasSize() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  retrowaveCanvas.width = window.innerWidth;
  retrowaveCanvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// --- Stars Animation ---
let stars = [];
function createStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2,
    });
  }
}

function animateStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  for (let star of stars) {
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    starsCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    starsCtx.fill();

    star.y += star.speed;
    if (star.y > starsCanvas.height) {
      star.y = 0;
      star.x = Math.random() * starsCanvas.width;
    }
  }
  requestAnimationFrame(animateStars);
}

createStars();
animateStars();

// --- Retrowave Grid Animation ---
let waveOffset = 0;

function drawGrid() {
  retroCtx.clearRect(0, 0, retrowaveCanvas.width, retrowaveCanvas.height);
  const gridSize = 40;
  const perspective = 0.8;

  // Draw horizontal lines
  for (let y = retrowaveCanvas.height / 2; y < retrowaveCanvas.height; y += gridSize) {
    const lineWidth = 2 + (y - retrowaveCanvas.height / 2) * perspective * 0.02;
    retroCtx.beginPath();
    retroCtx.strokeStyle = 'rgba(255, 0, 255, 0.7)';
    retroCtx.lineWidth = lineWidth;
    retroCtx.moveTo(0, y - waveOffset);
    retroCtx.lineTo(retrowaveCanvas.width, y - waveOffset);
    retroCtx.stroke();
  }

  // Draw vertical lines
  for (let x = 0; x < retrowaveCanvas.width; x += gridSize) {
    retroCtx.beginPath();
    retroCtx.strokeStyle = 'rgba(255, 0, 255, 0.7)';
    retroCtx.lineWidth = 2;
    retroCtx.moveTo(x, retrowaveCanvas.height / 2 - waveOffset);
    retroCtx.lineTo(x * perspective + retrowaveCanvas.width / 2, retrowaveCanvas.height);
    retroCtx.stroke();
  }

  waveOffset += 1;
  if (waveOffset >= gridSize) waveOffset = 0;
}

function animateGrid() {
  drawGrid();
  requestAnimationFrame(animateGrid);
}

animateGrid();
