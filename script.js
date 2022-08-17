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
    square.addEventListener("click", () => {
      square.classList.add(game.activePlayer.marker);
      square.textContent = game.activePlayer.marker;
      board[index] = game.activePlayer.marker;
      game.openSquares -= 1;
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

  return { activePlayer, gameWon, openSquares };
})();
