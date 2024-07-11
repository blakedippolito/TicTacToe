class TicTacToe {
<<<<<<< HEAD
  constructor(player1 = "Player1", player2 = "Player2") {
    this.player1 = player1;
    this.player2 = player2;
    this.counter = 1;
    this.previousMoves = [];
=======
  constructor(player1 = 'Player1', player2 = 'Player2') {
    this.player1 = player1;
    this.player2 = player2;
    this.turnCounter = 1;
    this.previousMoves = [];
    // Keep track of which moves are left - means will always pick an available move
    this.availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684
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

<<<<<<< HEAD
  calculateTurn() {
    let turn = Math.floor(Math.random() * 9 + 1);
    return turn;
  }

  determinePlayerTurn() {
    return this.counter % 2 !== 0 ? 0 : 1; // 0 for player, 1 for computer
  }

  takeTurn() {
    if (this.gameOver) {
      return;
    }
    let player = this.determinePlayerTurn()
    let turn = this.calculateTurn();
    while (this.previousMoves.includes(turn)) {
      turn = this.calculateTurn();
    }

    this.previousMoves.push(turn);

    if (player === 0) {
      console.log("Player 1 turn");
      this.player1Moves.push(turn);
      let player1Square = document.querySelector(`#r${turn}`);
      player1Square.innerText = "X";
      player1Square.classList.add("green");
    } else {
      console.log("Player 2 turn");
      this.player2Moves.push(turn);
      let player2Square = document.querySelector(`#r${turn}`);
      player2Square.innerText = "O";
      player2Square.classList.add("red");
    }

    this.counter++;
    this.determineWinner();
  }

  playerTurn() {
    let player = this.determinePlayerTurn()
    if (this.gameOver) return;

    if (this.currentTurnHandler) {
      document.querySelectorAll(".row").forEach((cell) => {
        cell.removeEventListener("click", this.currentTurnHandler);
=======
  autoGame() {
    // Play another turn in a second
    const turnTime = 1000;

    const playTurn = () => {
      if (this.gameOver) return;
      if (this.availableMoves.length !== 0) {
        this.autoTurn();
        setTimeout(playTurn, turnTime);
      } else {
        TicTacToe.updateStateMessage('Game drawn');
      }
    };

    playTurn();
  }

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
      TicTacToe.setSquare(nextMove, 'X', 'green');
    } else {
      this.player2Moves.push(nextMove);
      TicTacToe.setSquare(nextMove, 'O', 'red');
    }

    // Can only have a winner after the 5th move
    if (this.turnCounter >= 5) {
      this.determineWinner();
    }
    // No winner? Then increase counter
    this.turnCounter++;
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

  playerTurn() {
    // THIS PART NEEDS WORK

    if (this.gameOver) return;

    // Don't understand the purpose of this
    if (this.currentTurnHandler) {
      document.querySelectorAll('.row').forEach((cell) => {
        cell.removeEventListener('click', this.currentTurnHandler);
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684
      });
    }

    this.currentTurnHandler = (event) => {
<<<<<<< HEAD
      const turn = parseInt(event.target.id.slice(1)); 
=======
      const turn = parseInt(event.target.id.slice(1));
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684
      if (this.previousMoves.includes(turn)) {
        return;
      }

      this.previousMoves.push(turn);

<<<<<<< HEAD
      if (player===0) {
        this.player1Moves.push(turn);
        event.target.innerText = "X";
        event.target.classList.add("green");
      }
    };
    document.querySelectorAll(".row").forEach((cell) => {
        cell.addEventListener("click", this.currentTurnHandler);
      });
  }

  userGame () {
    
    const playTurn = () => {
        let turn = this.determinePlayerTurn()
        console.log(turn)
        let movesSet = new Set(this.previousMoves);
        if (movesSet.size !==9 && !this.gameOver) {
            if (turn === 0) {
                this.playerTurn()
            } else {
                this.takeTurn()
        }
    }

    }
    playTurn()
    this.determineWinner()

  }

 autoGame() {
    const playTurn = () => {
      let movesSet = new Set(this.previousMoves);
      if (movesSet.size !== 9 && !this.gameOver) {
        this.takeTurn();
        setTimeout(playTurn, 1000);
      }
    };

    playTurn();
  }

  determineWinner() {
    let currentPlayerMoves =
      this.counter % 2 !== 0 ? this.player1Moves : this.player2Moves;
    currentPlayerMoves.sort((a, b) => a - b);
=======
      if (this.turnCounter % 2 !== 0) {
        this.player1Moves.push(turn);
        event.target.innerText = 'X';
        event.target.classList.add('green');
      }
    };
  }

  userGame() {
    const activePlayer = this.determineActivePlayer();
    TicTacToe.updateStateMessage(activePlayer);

    const playTurn = () => {
      // Not had 9 turns or game over?
      if (this.turnCounter < 9 && !this.gameOver) {
        // THIS PART NEEDS WORK
        // If it is the players turn, let them play
        if (activePlayer === 0) {
          this.playerTurn();
        }
        //   If it is the computers turn, auto play
        else {
          this.autoTurn();
        }
      }
    };
    playTurn();
    this.determineWinner();
  }

  determineWinner() {
    const activePlayer = this.determineActivePlayer();
    let currentPlayerMoves =
      activePlayer === 1 ? this.player1Moves : this.player2Moves;
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684

    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let combination of this.winningCombinations) {
      if (checker(currentPlayerMoves, combination)) {
<<<<<<< HEAD
        const winner = this.counter % 2 !== 0 ? this.player1 : this.player2;
        console.log(`${winner} Wins!`);
        document.querySelector("h2").innerText = `${winner} Wins`;
=======
        TicTacToe.updateStateMessage(`Player ${activePlayer} wins!`);
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684
        this.gameOver = true;
        return;
      }
    }
  }
<<<<<<< HEAD
}

//Auto Play
document.querySelector("#autoPlay").addEventListener("click", () => {
  document.querySelectorAll(".row").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("green");
    cell.classList.remove("red");
  });
  let player1Name = document.querySelector("input").value || "Player 1";
=======

  static setSquare(move, counter, colour) {
    const targetSquare = document.querySelector(`#r${move}`);
    targetSquare.innerText = counter;
    targetSquare.classList.add(colour);
  }

  static clearBoard() {
    document.querySelectorAll('.row').forEach((cell) => {
      cell.innerHTML = '';
      cell.classList.remove('green');
      cell.classList.remove('red');
    });
  }

  static updateStateMessage(msg) {
    document.querySelector('.gameState').innerText = msg;
  }

  static enableClicking() {
    document
      .querySelector('.board')
      .addEventListener('click', handleBoardClick);
  }

  static disableClicking() {
    document
      .querySelector('.board')
      .removeEventListener('click', handleBoardClick);
  }
}

//Auto Play
document.querySelector('#autoPlay').addEventListener('click', () => {
  TicTacToe.clearBoard();
  // New game has no message
  TicTacToe.updateStateMessage('');

  let player1Name = document.querySelector('input').value || 'Player 1';
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684
  let autoTicTacToe = new TicTacToe(player1Name);
  autoTicTacToe.autoGame();
});

//User Play
<<<<<<< HEAD
document.querySelector("#userPlay").addEventListener("click", () => {
    document.querySelectorAll(".row").forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("green");
      cell.classList.remove("red");
    });
    let player1Name = document.querySelector("input").value || "Player 1";
    let userTicToe = new TicTacToe(player1Name);
    document.querySelector("input").placeholder = player1Name;
    userTicToe.userGame();
  });
=======
document.querySelector('#userPlay').addEventListener('click', () => {
  TicTacToe.clearBoard();
  // New game has no message
  TicTacToe.updateStateMessage('');

  let player1Name = document.querySelector('input').value || 'Player 1';
  let userTicToe = new TicTacToe(player1Name);
  document.querySelector('input').placeholder = player1Name;

  userTicToe.userGame();
});

// NEEDS WORK
function handleBoardClick(e) {
  console.log(e.target);
}
>>>>>>> 3213ad350d9477b1ce5a9971f22df4770e654684
