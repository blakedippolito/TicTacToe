
class TicTacToe {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.counter = 1
        this.player1Symbol = "X"
        this.player2Symbol = "O"
        this.previousMoves = []
        
    }

    calculateTurn () {
        let turn = Math.floor(Math.random()*9+1)
        return turn

    }


    takeTurn () {
        let turn = this.calculateTurn()
        if (this.counter%2 !==0) {
            console.log('Player 1 turn')
            
            while (!this.previousMoves.includes(turn)) {
                this.previousMoves.push(turn)
                let player1Square = document.querySelector(`#r${turn}`)
                player1Square.innerText = this.player1Symbol
                player1Square.classList.add('green')
            }
            
        } else {
            console.log('Player 2 turn')
            while (!this.previousMoves.includes(turn)) {
                this.previousMoves.push(turn)
                let player2Square = document.querySelector(`#r${turn}`)
                player2Square.innerText = this.player2Symbol
                player2Square.classList.add('red')
            }
        }
        this.counter++;
        console.log(this.previousMoves)
    }

    startGame() {
        
        const playTurn = () => {
            let movesSet = new Set(this.previousMoves)
            if (movesSet.size!==9) {
                console.log(movesSet.size)
                this.takeTurn()
                setTimeout(playTurn, 1000)
            }
        }
        playTurn();
    }
    
}

let tictactoe1 = new TicTacToe("Blake", "Lindsay")
tictactoe1.startGame()
