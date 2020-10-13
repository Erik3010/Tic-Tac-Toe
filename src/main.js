const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.height;

const length = 5;

const size = w / length;

window.onload = init();

function init() {
  game = new Game();
  update();
}

function update() {
  if (!game.gameOver || game.checkGameOver()) {
    ctx.clearRect(0, 0, w, h);
    game.update();

    requestAnimationFrame(update);
  } else {
    alert(`${game.win}! Win`);
    location.reload();
  }
}
