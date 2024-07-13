class TicTacToe {
  constructor(player1 = 'Player1', player2 = 'Player2') {
    this.player1 = player1;
    this.player2 = player2;
    this.turnCounter = 1;
    this.previousMoves = [];
    // Who is the active player?
    this._activePlayer;
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
    // Make it so I can access TicTacToe object in clicks
    this.handleBoardClick = this.handleBoardClick.bind(this);

    this.currentTurnHandler = null;
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
        TicTacToe.updateStateMessage('Game drawn');
      }
    };

    playTurn();
  }

  autoTurn() {
    this.determineActivePlayer();
    TicTacToe.updateStateMessage(`Player ${this._activePlayer}'s turn`);
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
      this._activePlayer = 1;
    } else {
      this._activePlayer = 2;
    }
  }

  playerTurn() {
    this.determineActivePlayer();
    // THIS PART NEEDS WORK

    if (this.gameOver) return;

    // It's the players turn so the board should be clickable
    this.enableClicking();
    TicTacToe.updateStateMessage(`Player ${this._activePlayer}'s turn`);
  }

  async userGame() {
    // Not had 9 turns or game over? - Make this iteration later.
    while (this.turnCounter <= 9 && !this.gameOver) {
      this.determineActivePlayer();
      // If it is the players turn, let them play
      if (this._activePlayer === 1) {
        this.waiting = true;
        this.playerTurn();
        // Wait here for the promise to resolve
        await this.waitForPlayerClick();
      }
      //   If it is the computers turn, auto play
      else {
        this.autoTurn();
      }
    }
  }

  determineWinner() {
    this.determineActivePlayer();
    let currentPlayerMoves =
      this._activePlayer === 1 ? this.player1Moves : this.player2Moves;

    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let combination of this.winningCombinations) {
      if (checker(currentPlayerMoves, combination)) {
        TicTacToe.updateStateMessage(`Player ${this._activePlayer} wins!`);
        this.gameOver = true;
        return;
      }
    }
  }

  waitForPlayerClick() {
    return new Promise((resolve) => {
      this.clickResolver = resolve;
    });
  }

  enableClicking() {
    document
      .querySelector('.board')
      .addEventListener('click', this.handleBoardClick);
  }

  disableClicking() {
    document
      .querySelector('.board')
      .removeEventListener('click', this.handleBoardClick);
  }

  handleBoardClick(e) {
    const clickedCell = +e.target.id.replace('cell-', '');
    // Is it a valid move?
    if (!this.availableMoves.includes(clickedCell)) return;

    // Remove from playable
    this.availableMoves.splice(this.availableMoves.indexOf(clickedCell), 1);
    // Add to played
    this.previousMoves.push(clickedCell);

    // Set piece
    this.player1Moves.push(clickedCell);
    TicTacToe.setSquare(clickedCell, 'X', 'green');

    // Disable clicking
    this.disableClicking();
    // Increment turn
    if (this.turnCounter >= 5) {
      this.determineWinner();
    }
    if (this.clickResolver) {
      this.clickResolver();
      this.clickResolver = null;
    }

    this.turnCounter++;
    this.waiting = false;
  }

  static setSquare(move, counter, colour) {
    const targetSquare = document.querySelector(`#cell-${move}`);
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

  static generateBoard() {
    const boardEle = document.querySelector('.board');
    const rows = 3;
    const columns = 3;
    let boardHTML = '';
    for (let column = 1; column <= columns; column++) {
      boardHTML += `<section class="column" id="col-${column}">\n`;
      for (let row = 1; row <= rows; row++) {
        boardHTML += `<section class="row" id="cell-${(column - 1) * 3 + row}"></section>\n`;
      }
      boardHTML += `</section>\n`;
    }
    boardEle.innerHTML = boardHTML;
  }
}

// Generates a new board on page load
TicTacToe.generateBoard();

//Auto Play
document.querySelector('#autoPlay').addEventListener('click', () => {
  setupGame();
  let autoTicTacToe = new TicTacToe();
  autoTicTacToe.autoGame();
});

//User Play
document.querySelector('#userPlay').addEventListener('click', () => {
  setupGame();

  let userTicToe = new TicTacToe();
  userTicToe.userGame();
});

function setupGame() {
  // Creates a new board for a new game
  TicTacToe.generateBoard();
  // New game has no message
  TicTacToe.updateStateMessage('');
}
