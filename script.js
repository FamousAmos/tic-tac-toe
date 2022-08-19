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
      if (square.textContent === "" && game.gameWon === false) {
        square.classList.add(game.activePlayer.marker);
        square.textContent = game.activePlayer.marker;
        board[index] = game.activePlayer.marker;
        game.openSquares -= 1;
        game.verifyWinner();
      }

      if (game.gameWon === false && game.openSquares > 0) {
        game.nextPlayer();
      } else {
        game.declareTie();
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

  const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function nextPlayer() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
      player.textContent = "Player 2";
    } else {
      this.activePlayer = playerOne;
      player.textContent = "Player 1";
    }
  }

  function verifyWinner() {
    winningSequences.forEach((sequence) => {
      if (sequence.every(isSameMark)) {
        dialogue.innerHTML = `${this.activePlayer.name} wins!`;
        this.gameWon = true;
      }
    });
  }

  function isSameMark(index) {
    return gameBoard.board[index] === this.activePlayer.marker;
  }

  function declareTie() {
    dialogue.innerHTML = "Tie game!";
  }

  return {
    activePlayer,
    gameWon,
    openSquares,
    nextPlayer,
    verifyWinner,
    declareTie,
  };
})();
