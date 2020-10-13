class Game {
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    this.player = 1;
    this.opponent = 2;

    this.turn = this.player;

    this.win = 0;

    this.direction = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
    ];

    this.gameOver = false;

    this.opponentImage = new Image();
    this.opponentImage.src = "images/opponent.png";

    this.playerImage = new Image();
    this.playerImage.src = "images/player.png";

    this.listener();
  }
  listener() {
    canvas.addEventListener("click", (e) => {
      let y = Math.floor(e.offsetY / size);
      let x = Math.floor(e.offsetX / size);

      if (this.turn == this.opponent) return;
      this.click(y, x);
    });
  }
  click(y, x) {
    if (this.board[y][x] == 0) {
      this.board[y][x] = this.turn;

      this.check();
      this.turn = (this.turn % 2) + 1;

      if (this.turn == this.opponent) this.randomMove();
    }
  }
  randomMove() {
    setTimeout(() => {
      let y, x;
      while (true) {
        y = this.random(length);
        x = this.random(length);
        if (this.board[y][x] == 0) break;
      }
      //   console.log(y, x);
      this.click(y, x);
    }, 500);
  }
  drawBoard() {
    this.board.forEach((row, y) => {
      if (y != 0) {
        ctx.beginPath();
        ctx.moveTo(0, y * size);
        ctx.lineTo(w, y * size);
        ctx.stroke();
        ctx.closePath();
      }
      row.forEach((col, x) => {
        if (x != 0) {
          ctx.beginPath();
          ctx.moveTo(x * size, 0);
          ctx.lineTo(x * size, h);
          ctx.stroke();
          ctx.closePath();
        }
      });
    });
  }
  draw() {
    this.board.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col > 0) {
          if (col == this.player)
            ctx.drawImage(
              this.playerImage,
              x * size + size / 6,
              y * size + size / 6,
              size / 1.5,
              size / 1.5
            );
          else if (col == this.opponent)
            ctx.drawImage(
              this.opponentImage,
              x * size + size / 6,
              y * size + size / 6,
              size / 1.5,
              size / 1.5
            );
        }
      });
    });
  }
  update() {
    // this.check();

    this.draw();
    this.drawBoard();
  }
  check() {
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        this.direction.forEach((dir) => {
          let [dirY, dirX] = dir;

          //   let nextY = y + dirY;
          //   let nextX = x + dirX;

          //   if (
          // this.inBoard(y, x)
          // this.board[y][x] == this.turn
          // this.board[nextY][nextX] == this.board[y][x]
          //   ) {
          if (this.checkSame(y, x, dirY, dirX)) {
            setTimeout(() => {
              this.gameOver = true;
            }, 10);
          }
          //   }
        });
      }
    }
  }
  checkSame(y, x, dirY, dirX) {
    let count = 0;

    while (this.inBoard(y, x) && this.board[y][x] == this.turn) {
      if (this.board[y][x] == 0) break;
      count++;

      y += dirY;
      x += dirX;
    }

    if (count == 4) this.win = this.turn == 1 ? "player" : "opponent";

    return count == 4;
  }
  inBoard(y, x) {
    return y >= 0 && x >= 0 && y < length && x < length;
  }
  random(length) {
    return Math.floor(Math.random() * length);
  }
  checkGameOver() {
    let over = true;
    this.board.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col == 0) over = false;
      });
    });
    return over;
  }
}
