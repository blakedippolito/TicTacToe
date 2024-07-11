class TicTacToe {
  constructor(player1 = 'Player1', player2 = 'Player2') {
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

  pickRandomMove() {
    // Pick a random move and remove it from the available moves
    let index = Math.floor(Math.random() * this.availableMoves.length);
    const turn = this.availableMoves.splice(index, 1)[0];
    return turn;
  }

  determinePlayerTurn() {
    if (this.turnCounter % 2 === 0) {
      // Changed so number matches player
      return 1;
    } else {
      return 0;
    }
  }

  takeTurn() {
    if (this.gameOver) {
      console.log('GAME OVER!');
      return;
    }
    let nextMove = this.pickRandomMove();

    // History of moves
    this.previousMoves.push(nextMove);

    if (this.turnCounter % 2 !== 0) {
      this.updateStateMessage('Player 1 turn');
      this.player1Moves.push(nextMove);
      this.setSquare(nextMove, 'X', 'green');
    } else {
      this.updateStateMessage('Player 2 turn');
      this.player2Moves.push(nextMove);
      this.setSquare(nextMove, 'O', 'red');
    }

    // Can only have a winner after the 5th move
    if (this.turnCounter >= 5) {
      this.determineWinner();
    }
    // No winner? Then increase counter
    this.turnCounter++;
  }

  setSquare(move, counter, colour) {
    // Abstracted logic out
    const targetSquare = document.querySelector(`#r${move}`);
    targetSquare.innerText = counter;
    targetSquare.classList.add(colour);
  }

  playerTurn() {
    if (this.gameOver) return;

    if (this.currentTurnHandler) {
      document.querySelectorAll('.row').forEach((cell) => {
        cell.removeEventListener('click', this.currentTurnHandler);
      });
    }

    this.currentTurnHandler = (event) => {
      const turn = parseInt(event.target.id.slice(1));
      if (this.previousMoves.includes(turn)) {
        return;
      }

      this.previousMoves.push(turn);

      if (this.turnCounter % 2 !== 0) {
        this.player1Moves.push(turn);
        event.target.innerText = 'X';
        event.target.classList.add('green');
      }
    };
  }

  userGame() {
    let turn = this.determinePlayerTurn();
    this.updateStateMessage(turn);

    const playTurn = () => {
      let movesSet = new Set(this.previousMoves);
      if (movesSet.size !== 9 && !this.gameOver) {
        if (turn === 0) {
          this.playerTurn();
        } else {
          this.takeTurn();
        }
      }
    };
    playTurn();
    this.determineWinner();
  }

  autoGame() {
    this.updateStateMessage('');

    const playTurn = () => {
      if (this.gameOver) return;
      if (this.availableMoves.length !== 0) {
        this.takeTurn();
        setTimeout(playTurn, 100);
      } else {
        this.updateStateMessage('Game drawn');
      }
    };

    playTurn();
  }

  determineWinner() {
    const activePlayer = this.turnCounter % 2 !== 0 ? 1 : 2;
    let currentPlayerMoves =
      activePlayer === 1 ? this.player1Moves : this.player2Moves;

    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let combination of this.winningCombinations) {
      if (checker(currentPlayerMoves, combination)) {
        this.updateStateMessage(`Player ${activePlayer} Wins!`);
        this.gameOver = true;
        return;
      }
    }
  }

  updateStateMessage(msg) {
    document.querySelector('.gameState').innerText = msg;
  }
}

//Auto Play
document.querySelector('#autoPlay').addEventListener('click', () => {
  clearBoard();
  let player1Name = document.querySelector('input').value || 'Player 1';
  let autoTicTacToe = new TicTacToe(player1Name);
  autoTicTacToe.autoGame();
});

//User Play
document.querySelector('#userPlay').addEventListener('click', () => {
  clearBoard();
  let player1Name = document.querySelector('input').value || 'Player 1';
  let userTicToe = new TicTacToe(player1Name);
  document.querySelector('input').placeholder = player1Name;

  //   Remove existing click event
  document
    .querySelector('.board')
    .removeEventListener('click', handleBoardClick);

  //   Listen to clicks on the board
  document.querySelector('.board').addEventListener('click', handleBoardClick);
  userTicToe.userGame();
});

function handleBoardClick(e) {
  console.log(e.target);
}

// Moved repeat code to own function
function clearBoard() {
  document.querySelectorAll('.row').forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove('green');
    cell.classList.remove('red');
  });
}
