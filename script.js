const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Прогресс бар → меню
const progressBar = document.querySelector('.progress-bar');
const loader = document.getElementById('loader');
const menu = document.getElementById('menu');

progressBar.addEventListener('animationend', () => {
  loader.style.display = 'none';
  menu.style.display = 'flex';
});

// Снег
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flakes = [];
for (let i = 0; i < 80; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    d: Math.random() * 80
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.beginPath();
  flakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
  });
  ctx.fill();
  moveSnow();
}

let angle = 0;
function moveSnow() {
  angle += 0.01;
  flakes.forEach(f => {
    f.y += Math.cos(angle + f.d) + 1 + f.r/2;
    f.x += Math.sin(angle) * 2;
    if(f.y > canvas.height) {
      f.y = -5;
      f.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawSnow, 30);

// Привязка действий к кнопкам
document.getElementById("game1").onclick = () => alert("Запустить 100x!");
document.getElementById("game2").onclick = () => alert("Запустить Попади в мишень!");
document.getElementById("game3").onclick = () => alert("Запустить Ракетка!");
