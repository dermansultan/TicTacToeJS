// Game winning combinations:
var winning_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Gameboard Module
const gameBoard = (() => {
  let gameSpaces = ["", "", "", "", "", "", "", "", ""];
  console.log(gameSpaces);

  const resetBoard = () => {
    for (let i = 0; i < gameSpaces.length; i++) {
      if (gameSpaces[i] == "X" || "O") {
        gameSpaces[i] = "";
      }
    }
    let board = document.getElementsByClassName("space");
    for (let space of board) {
      space.innerHTML = "";
    }
    console.log(gameSpaces);

    // Reset currentPlayer
    gameState.currentPlayerisX = true;
    gameState.totalMoves = 0;
    gameState.movesO = 0;
    gameState.movesX = 0;
    console.log(gameState.totalMoves);
    console.log(gameState.movesX);
    console.log(gameState.movesO);
  };

  let resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", resetBoard);
  return { gameSpaces, resetBoard };
})();

// HTML Display Module
const displayController = (() => {
  // Modal Variables
  let modalContents = document.querySelectorAll("modalContent");
  let modalOverlay = document.getElementById("modal");
  let modalTitle = document.getElementById("modalTitle");
  let modalParaX = document.getElementById("modalParaX");
  let modalParaO = document.getElementById("modalParaO");
  let modalBtn = document.getElementById("modalBtn");

  const gameRestart = () => {
    gameBoard.resetBoard();
    modalClose();
  };

  modalBtn.addEventListener("click", gameRestart);

  const modalOpen = function () {
    modalOverlay.style.visibility = "visible";
    console.log("modal was opened");
  };

  const modalClose = function () {
    modalOverlay.style.visibility = "hidden";
  };

  const render = () => {
    let board = document.getElementsByClassName("space");
    Array.from(board).forEach(function (boardSpace) {
      boardSpace.addEventListener("click", tileClick);
    });
    for (let space of board) {
      space.innerHTML = gameBoard.gameSpaces[Number(space.dataset.space)];
    }
  };

  const tileClick = function (event) {
    console.log("space was clicked!");
    console.log(this);
    if (gameState.currentPlayerisX === true) {
      if (gameBoard.gameSpaces[Number(this.dataset.space)] == "") {
        gameBoard.gameSpaces[Number(this.dataset.space)] = "X";
        gameState.movesX++;
        gameState.totalMoves++;
        //
        gameState.currentPlayerisX = false;
      }
    } else if (gameState.currentPlayerisX === false) {
      if (gameBoard.gameSpaces[Number(this.dataset.space)] == "") {
        gameBoard.gameSpaces[Number(this.dataset.space)] = "O";
        gameState.movesO++;
        gameState.totalMoves++;
        //
        gameState.currentPlayerisX = true;
      }
    }
    console.log(gameBoard.gameSpaces);
    console.log(gameState.totalMoves);
    console.log(gameState.movesX);
    console.log(gameState.movesO);
    render();
    gameState.gameCheck();
  };

  modalOverlay.addEventListener("click", () => {
    gameBoard.resetBoard();
    modalClose();
  });

  return {
    render,
    tileClick,
    modalOpen,
    modalClose,
    modalContents,
    modalOverlay,
    modalTitle,
    modalParaX,
    modalParaO,
    modalBtn,
  };
})();

//Render the gameboard array onto HTML
displayController.render();

// Game State
const gameState = (() => {
  let totalMoves = 0;
  let movesO = 0;
  let movesX = 0;

  // True is P1, False is P2
  let currentPlayerisX = true;

  const gameCheck = () => {
    for (let combo of winning_combos) {
      // X wins
      if (
        gameBoard.gameSpaces[combo[0]] == "X" &&
        gameBoard.gameSpaces[combo[1]] == "X" &&
        gameBoard.gameSpaces[combo[2]] == "X"
      ) {
        console.log("X won the round!");
        roundWon("X");
        displayController.modalOpen();
        return true;
        // O wins
      } else if (
        gameBoard.gameSpaces[combo[0]] == "O" &&
        gameBoard.gameSpaces[combo[1]] == "O" &&
        gameBoard.gameSpaces[combo[2]] == "O"
      ) {
        console.log("O has won the round!");
        roundWon("O");
        displayController.modalOpen();
        return true;
      }
    }
    // when it's a tie at round 9
    if (gameState.totalMoves == 9) {
      console.log("baboooey tie gang");
      displayController.modalTitle.textContent = `It's a tie!`;
      displayController.modalOpen();
    }
    return false;
  };

  const roundWon = (player) => {
    if (player === "X") {
      playerX.playerWins++;
      displayController.modalTitle.textContent = `${player} has won the round!`;
      displayController.modalParaX.textContent = `X has won ${playerX.playerWins} rounds`;
      return true;
    } else if (player === "O") {
      playerO.playerWins++;
      displayController.modalTitle.textContent = `${player} has won the round!`;
      displayController.modalParaO.textContent = `O has won ${playerO.playerWins} rounds`;
      return true;
    }
  };

  return { totalMoves, movesO, movesX, currentPlayerisX, gameCheck, roundWon };
})();

// Player Function Factory
const Player = () => {
  let playerWins = 0;
  return { playerWins };
};

//Players
const playerX = Player("X");
const playerO = Player("O");
