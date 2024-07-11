class TicTacToe {
  constructor(player1 = "Player1", player2 = "Player2") {
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
    this.gameOver = false;

    this.currentTurnHandler = null;
  }

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
      });
    }

    this.currentTurnHandler = (event) => {
      const turn = parseInt(event.target.id.slice(1)); 
      if (this.previousMoves.includes(turn)) {
        return;
      }

      this.previousMoves.push(turn);

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

    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let combination of this.winningCombinations) {
      if (checker(currentPlayerMoves, combination)) {
        const winner = this.counter % 2 !== 0 ? this.player1 : this.player2;
        console.log(`${winner} Wins!`);
        document.querySelector("h2").innerText = `${winner} Wins`;
        this.gameOver = true;
        return;
      }
    }
  }
}

//Auto Play
document.querySelector("#autoPlay").addEventListener("click", () => {
  document.querySelectorAll(".row").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("green");
    cell.classList.remove("red");
  });
  let player1Name = document.querySelector("input").value || "Player 1";
  let autoTicTacToe = new TicTacToe(player1Name);
  autoTicTacToe.autoGame();
});

//User Play
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