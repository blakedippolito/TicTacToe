
class TicTacToe {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.counter = 1
        this.player1Symbol = "X"
        this.player2Symbol = "O"
    }



    takeTurn () {
        if (this.counter%2 !==0) {
            console.log('Player 1 turn')
            const turn = Math.floor(Math.random()*9)
            console.log(turn)
            document.querySelector(`#r${turn}`).innerText = this.player1Symbol
        } else {
            console.log('Player 2 turn')
            const turn = Math.floor(Math.random()*9)
            console.log(turn)
            document.querySelector(`#r${turn}`).innerText = this.player2Symbol
        }
        this.counter++;
        console.log(this.counter)
    }

    startGame() {
        while (this.counter<=10) {
            this.takeTurn()
        }
    }
    
}

let tictactoe1 = new TicTacToe("Blake", "Lindsay")
tictactoe1.startGame()
