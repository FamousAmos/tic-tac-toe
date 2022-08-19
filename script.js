const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  let squares = document.querySelector(".squares");

  board.forEach((item, index) => {
    const square = document.createElement("div");
    square.className = "square";
    square.textContent = "";
    square.addEventListener("click", () => {
      if (square.textContent === "") {
        square.classList.add(game.activePlayer.marker);
        square.textContent = game.activePlayer.marker;
        board[index] = game.activePlayer.marker;
        game.openSquares -= 1;
      }

      if (game.gameWon === false && game.openSquares > 0) {
        game.nextPlayer();
      } else {
        // game.declareTie();
      }
    });
    squares.appendChild(square);
  });
  return { board };
})();

const game = (() => {
  const playerOne = createPlayer("Player 1", "X");
  const playerTwo = createPlayer("Player 2", "O");

  let activePlayer = playerOne;
  let gameWon = false;
  let openSquares = 9;

  let dialogue = document.querySelector(".dialogue");
  let player = document.querySelector(".player");
  player.textContent = "Player 1";

  function nextPlayer() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
      player.textContent = "Player 2";
    } else {
      this.activePlayer = playerOne;
      player.textContent = "Player 1";
    }
  }

  return { activePlayer, gameWon, openSquares, nextPlayer };
})();
