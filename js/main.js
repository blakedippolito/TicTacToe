class TicTacToe {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.counter = 1;
    this.previousMoves = [];
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
  }

  calculateTurn() {
    let turn = Math.floor(Math.random() * 9 + 1);
    return turn;
  }

  takeTurn() {
    let turn = this.calculateTurn();
    while (this.previousMoves.includes(turn)) {
      turn = this.calculateTurn();
    }

    this.previousMoves.push(turn);

    if (this.counter % 2 !== 0) {
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

  playGame() {
    const playTurn = () => {
      let movesSet = new Set(this.previousMoves);
      if (movesSet.size !== 9) {
        this.takeTurn();
        setTimeout(playTurn, 1000);
      }
    };
    
    playTurn();
  }

  determineWinner() {
    let sortedMoves = this.counter%2!==0 ? this.player1Moves.sort((a,b)=>a-b) : this.player2Moves.sort((a,b)=>a-b)
    
    sortedMoves.filter(item=> {
        
    })

  }
}

let tictactoe1 = new TicTacToe("Blake", "Lindsay");
tictactoe1.playGame();
