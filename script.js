const gameState = {};

const resetGame = () => {
  gameState.playerTurns = ["", ""];
  gameState.currentPlayerIdx = 0;
  gameState.board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  gameState.win = false;
  gameState.playerXSelections = [];
  gameState.playerOSelections = [];
  gameState.winningPlays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
}

let boardElm = document.querySelector("#board");
let boardCell = document.querySelector("#board .cell");
let player = document.querySelector("#playerTurn");
let resetElm = document.querySelector("#resetButton");

const gameStateBoard = () => {
  boardElm.innerHTML = "";
  for (let i = 0; i < gameState.board.length; i++) {
    const square = gameState.board[i];
    const cellElm = document.createElement("div");
    cellElm.classList.add("cell");
    cellElm.innerHTML = square;
    cellElm.setAttribute("id", i);
    boardElm.append(cellElm);
  }
}

const renderPlayer = () => {
  let text;

  if (!gameState.playerTurns[0] || !gameState.playerTurns[1]) {
    text = `
            <h3 class='choose-player'>Choose Player X or Player Y!</h3>
            <button type="button" class='player'>X</button>
            <button type="button" class='player'>Y</button>
            <button type="button" class="start">Start Game</button>
        `
  } else {
    text = `<h3>It's currently ${gameState.getCurrentPlayer()}'s turn.</h3>`
  }
  player.innerHTML = text;
}

const changeTurn = () => {
  gameState.currentPlayerIdx = (gameState.currentPlayerIdx + 1) % 2;
}

const resetButton = () => {
  let text = `
        <button type="button" class="reset">Reset Game</button>
    `
  resetElm.innerHTML = text;
};

const checkWinningConditionsO = () => {
  for (let i = 0; i < gameState.winningPlays.length; i++) {
    if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][0]) >= 0) {
      if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][1]) >= 0) {
        if (gameState.playerOSelections.indexOf(gameState.winningPlays[i][2]) >= 0) {
          alert(`${gameState.getCurrentPlayer()} won! Reset Game to play again!`);
          gameState.win = true;
        }
      }
    }
  }
};

const checkWinningConditionsX = () => {
  for (let i = 0; i < gameState.winningPlays.length; i++) {
    if (gameState.playerXSelections.indexOf(gameState.winningPlays[i][0]) >= 0) {
      if (gameState.playerXSelections.indexOf(gameState.winningPlays[i][1]) >= 0) {
        if (gameState.playerXSelections.indexOf(gameState.winningPlays[i][2]) >= 0) {
          alert(`${gameState.getCurrentPlayer()} won! Reset Game to play again!`);
          gameState.win = true;
        }
      }
    }
  }
};

const checkForDraw = () => {
  if (!gameState.board.includes("") && gameState.win === false || !gameState.board.includes("") && gameState.win === false) {
    alert(`It's a draw! Reset the game to play again!`);
  }
};

const newGame = () => {

  gameStateBoard();
  changeTurn();
  renderPlayer();
  resetButton();

};

player.addEventListener("click", function(event) {


  newGame();
});

boardElm.addEventListener("click", function(event) {
  if (event.target.className !== "cell") return

  let cellIdx = event.target.id;

  if (gameState.board[cellIdx] !== "") {
    return
  } else {
    gameState.currentRandomTurn = gameState.currentRandomTurn === "X" ? "O" : "X";
    gameState.board[cellIdx] = gameState.currentRandomTurn;
  }
  if (gameState.board[cellIdx] === "X") {
    gameState.playerXSelections.push(parseInt(cellIdx));
  }
  if (gameState.board[cellIdx] === "O") {
    gameState.playerOSelections.push(parseInt(cellIdx));
  }
  checkWinningConditionsO();
  checkWinningConditionsX();
  checkForDraw();
  newGame();
});

resetElm.addEventListener("click", function() {
  resetGame();
  newGame();
});

resetGame();
newGame();