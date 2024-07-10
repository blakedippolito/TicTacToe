
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
        if (this.counter%2 !==0) {
            console.log('Player 1 turn')
            let turn = this.calculateTurn()
            while (!this.previousMoves.includes(turn)) {
                this.previousMoves.push(this.calculateTurn())
                document.querySelector(`#r${turn}`).innerText = this.player1Symbol
            }
            
        } else {
            console.log('Player 2 turn')

            let turn = this.calculateTurn()
            while (!this.previousMoves.includes(turn)) {
                this.previousMoves.push(this.calculateTurn())
                document.querySelector(`#r${turn}`).innerText = this.player1Symbol
            }
            document.querySelector(`#r${turn}`).innerText = this.player2Symbol
        }
        this.counter++;
        console.log(this.previousMoves)
    }

    startGame() {
        const playTurn = () => {
            if (this.previousMoves.length===9) {
                this.takeTurn()
                setTimeout(playTurn, 1000)
            }
        }
        playTurn();
    }
    
}

let tictactoe1 = new TicTacToe("Blake", "Lindsay")
tictactoe1.startGame()
