const squares = document.querySelectorAll('.cell')
const restartButton = document.getElementById('restart')
const statut = document.getElementById('player')
let activGame = true
let currentPlayer = "X"
let gameStatus = ["","","","","","","","",""]

const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


const win = () =>  `Player ${currentPlayer} wins`
const draw = () => `Draw`
const turn = () => ` Player ${currentPlayer}`

statut.innerHTML = turn()

squares.forEach(square => {
    square.addEventListener('click',clickOut)
})

restartButton.addEventListener('click',restart)

function clickOut (e) {
    const gameBoard = Array.from(squares);
    const index = gameBoard.indexOf(e.target);

    if ( gameStatus[index] != "" || !activGame){
        return ;
    }

    gameStatus[index] = currentPlayer
    this.innerHTML = currentPlayer

    checkWin()
    
}

function checkWin() {
    let winTurn = false

    for (let winCondition of winCombination) {
        let val1 = gameStatus[winCondition[0]]
        let val2 = gameStatus[winCondition[1]]
        let val3 = gameStatus[winCondition[2]]
        if (val1 == "" || val2 == "" || val3 == ""){
            continue
        }
        if (val1 == val2 && val2 == val3) {
            winTurn = true
            break 
        }
    }
    if (winTurn){
        statut.innerHTML = win();
        activGame = false;
        return
    }

    if (!gameStatus.includes("")){
        statut.innerHTML = draw();
        activGame = false;
        return
    }

    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statut.innerHTML = turn();

}

function restart (){
    activGame = true;
    currentPlayer = "X";
    gameStatus = ["","","","","","","","",""];
    statut.innerHTML = turn();
    squares.forEach(square => {
        square.innerHTML = ""
    })
}