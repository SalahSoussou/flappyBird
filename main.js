const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const replay = document.getElementById("replay");

// const highScoreBo = document.querySelector('.highScore');
// let highScore = localStorage.getItem('theHighScore') || 0;

canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angel = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  //score count
  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.fillText(score, 450, 70);
  ctx.strokeText(score, 450, 70);
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angel += 0.12;
  hue++;
  frame++;
}

// animate();

replay.addEventListener("click", () => {
  init();
  animate();
  replay.style.display = "none";
});

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
});

function mobil() {
  window.addEventListener("touchstart", () => {
    spacePressed = true;
  });
  window.addEventListener("touchend", () => {
    spacePressed = false;
  });
}
document.addEventListener("DOMContentLoaded", mobil());

// const bang = new Image();
// bang.src = 'C:\Users\ever\start up\canves\flapy bird\Chrysanthemum.jpg';
function handleCollisions() {
  for (i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      //   ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      //  ctx.font = '25px Georgia';
      //  ctx.fillStyle = 'black'
      //  ctx.fillText('Game Over: ' + score, 200, canvas.height/2 - 10);
      replay.style.display = "inline-block";
      replay.innerHTML = `total score: ${score} \n Replay`;
      checkHighScore();
      return true;
    }
  }
}

const highScoreBo = document.querySelector(".highScore");
let highScore = localStorage.getItem("theHighScore") || 0;

highScoreBo.textContent = "High Score: " + highScore;

function checkHighScore() {
  if (score > localStorage.getItem("theHighScore")) {
    localStorage.getItem("theHighScore", score);
    highScore = score;
    highScoreBo.textContent = "High Score: " + highScore;
  }
}
