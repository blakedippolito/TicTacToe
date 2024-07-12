class TicTacToe {
  constructor(player1 = "Player1", player2 = "Player2") {
    this.player1 = player1;
    this.player2 = player2;
    this.turnCounter = 1;
    this.previousMoves = [];
    // Keep track of which moves are left - means will always pick an available move
    this.availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.player1Moves = [];
    this.player2Moves = [];
    this.winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    this.gameOver = false;

    this.currentTurnHandler = null;
  }
  // Automated Game Code//
  autoTurn() {
    const currentPlayer = this.determineActivePlayer();
    TicTacToe.updateStateMessage(`Player ${currentPlayer}'s turn`);
    if (this.gameOver) {
      return;
    }

    let nextMove = this.pickRandomMove();

    // History of moves
    this.previousMoves.push(nextMove);

    if (this.turnCounter % 2 !== 0) {
      this.player1Moves.push(nextMove);
      TicTacToe.setSquare(nextMove, "X", "green");
    } else {
      this.player2Moves.push(nextMove);
      TicTacToe.setSquare(nextMove, "O", "red");
    }

    // Can only have a winner after the 5th move
    if (this.turnCounter >= 5) {
      this.determineWinner();
    }
    // No winner? Then increase counter
    this.turnCounter++;
  }

  autoGame() {
    // Play another turn in a second
    const turnTime = 1000;

    const playTurn = () => {
      if (this.gameOver) return;
      if (this.availableMoves.length !== 0) {
        this.autoTurn();
        setTimeout(playTurn, turnTime);
      } else {
        TicTacToe.updateStateMessage("Game drawn");
      }
    };

    playTurn();
  }

  pickRandomMove() {
    // Pick a random move and remove it from the available moves
    let index = Math.floor(Math.random() * this.availableMoves.length);
    const turn = this.availableMoves.splice(index, 1)[0];
    return turn;
  }

  determineActivePlayer() {
    // Return the player number that matches
    if (this.turnCounter % 2 === 1) {
      return 1;
    } else {
      return 2;
    }
  }
  // User Game Code//

  playerTurn() {
    const currentPlayer = this.determineActivePlayer();

    if (this.currentTurnHandler) {
      document.querySelectorAll(".row").forEach((cell) => {
        cell.removeEventListener("click", this.currentTurnHandler);
      });
    }

    this.currentTurnHandler = (event) => {
      const turn = parseInt(event.target.id.slice(1));
      if (this.previousMoves.includes(turn)) {
        return;
      }

      this.previousMoves.push(turn);

      if (currentPlayer === 1) {
        this.player1Moves.push(turn);

        event.target.innerText = "X";
        event.target.classList.add("green");
      }

      this.turnCounter++;
      console.log(this.turnCounter);
      console.log(this.previousMoves);

      this.determineWinner();
      if (!this.gameOver) {
        this.userGame(); // Continue the game
      }
    };

    document.querySelectorAll(".row").forEach((cell) => {
      cell.addEventListener("click", this.currentTurnHandler);
    });
  }

  computerTurn() {
    const currentPlayer = this.determineActivePlayer();
    TicTacToe.updateStateMessage(`Player ${currentPlayer}'s turn`);
    if (this.gameOver) {
      return;
    }

    let nextMove = this.pickRandomMove();

    // History of moves
    this.previousMoves.push(nextMove);

    if (this.turnCounter % 2 === 0) {
      this.player2Moves.push(nextMove);
      TicTacToe.setSquare(nextMove, "O", "red");
    }

    // Can only have a winner after the 5th move
    if (this.turnCounter >= 5) {
      this.determineWinner();
    }
    // No winner? Then increase counter
    this.turnCounter++;
  }

  userGame() {
    const activePlayer = this.determineActivePlayer();
    TicTacToe.updateStateMessage(activePlayer);

    const playTurn = () => {
      // Not had 9 turns or game over?
      if (this.turnCounter < 9 && !this.gameOver) {
        // THIS PART NEEDS WORK
        // If it is the players turn, let them play
        if (activePlayer === 1) {
          console.log("Player1 GOOO");
          this.playerTurn();
        } else {
          
          console.log("Player2 GOOO");
          this.computerTurn();
        }
      }
    };
    setTimeout(playTurn, 1000)
    this.determineWinner();
  }

  determineWinner() {
    const activePlayer = this.determineActivePlayer();
    let currentPlayerMoves =
      activePlayer === 1 ? this.player1Moves : this.player2Moves;

    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let combination of this.winningCombinations) {
      if (checker(currentPlayerMoves, combination)) {
        TicTacToe.updateStateMessage(`Player ${activePlayer} wins!`);
        this.gameOver = true;
        return;
      }
    }
  }

  static setSquare(move, counter, colour) {
    const targetSquare = document.querySelector(`#r${move}`);
    targetSquare.innerText = counter;
    targetSquare.classList.add(colour);
  }

  static clearBoard() {
    document.querySelectorAll(".row").forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("green");
      cell.classList.remove("red");
    });
  }

  static updateStateMessage(msg) {
    document.querySelector(".gameState").innerText = msg;
  }

  static enableClicking() {
    document
      .querySelector(".board")
      .addEventListener("click", handleBoardClick);
  }

  static disableClicking() {
    document
      .querySelector(".board")
      .removeEventListener("click", handleBoardClick);
  }
}

//Auto Play
document.querySelector("#autoPlay").addEventListener("click", () => {
  TicTacToe.clearBoard();
  // New game has no message
  TicTacToe.updateStateMessage("");

  let player1Name = document.querySelector("input").value || "Player 1";
  let autoTicTacToe = new TicTacToe(player1Name);
  autoTicTacToe.autoGame();
});

//User Play
document.querySelector("#userPlay").addEventListener("click", () => {
  TicTacToe.clearBoard();
  // New game has no message
  TicTacToe.updateStateMessage("");

  let player1Name = document.querySelector("input").value || "Player 1";
  let userTicToe = new TicTacToe(player1Name);
  document.querySelector("input").placeholder = player1Name;

  userTicToe.userGame();
});

// NEEDS WORK
function handleBoardClick(e) {
  console.log(e.target);
}

// document.querySelector('.board').addEventListener('click', function (e) {
//   let click = e.target.id
//   console.log(click)

// })
