const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const jumpCountEl = document.getElementById('jumpCount');

let jumping = false;
let jumpCount = 0;
let obstacleSpeed = 6;

const obstacleImages = [
  'images/1.jpeg',
  'images/2.jpeg',
  'images/3.jpeg',
  'images/4.jpeg',
  'images/5.jpeg'
];

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space' && !jumping) {
    jump();
  }
});

function jump() {
  jumping = true;
  jumpCount++;
  jumpCountEl.textContent = jumpCount;

  // كلما وصل العدد لـ 10 أو مضاعف
  if (jumpCount % 10 === 0) {
    obstacleSpeed += 2; // زيد السرعة
  }

  let up = 0;

  const upInterval = setInterval(() => {
    if (up >= 120) {
      clearInterval(upInterval);

      const downInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(downInterval);
          jumping = false;
        } else {
          up -= 6;
          player.style.bottom = 20 + up + 'px';
        }
      }, 15);
    } else {
      up += 6;
      player.style.bottom = 20 + up + 'px';
    }
  }, 15);
}

function moveObstacle() {
  let obstaclePos = 800;

  const moveInterval = setInterval(() => {
    obstaclePos -= obstacleSpeed;
    obstacle.style.left = obstaclePos + 'px';

    if (obstaclePos < -50) {
      obstaclePos = 800;
      // اختار صورة عشوائية للعقبة
      const randomIndex = Math.floor(Math.random() * obstacleImages.length);
      obstacle.src = obstacleImages[randomIndex];
    }

    let playerBottom = parseInt(player.style.bottom) || 20;

    if (obstaclePos > 50 && obstaclePos < 100 && playerBottom < 60) {
      alert("Game Over! Total jumps: " + jumpCount);
      location.reload();
    }

  }, 15);
}

moveObstacle();
