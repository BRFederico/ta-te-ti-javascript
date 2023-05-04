const gameBoard = document.querySelector ('#gameboard')
const infoDisplay = document.querySelector ('#info')
const startCells = [
    "", "", "", "", "", "", "", "", ""
]

let go = "círculo"
infoDisplay.textContent = "Círculo va primero"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameBoard.append(cellElement)
    });
}

createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "círculo" ? "cruz" : "círculo"
    infoDisplay.textContent = "Ahora es el turno de " + go + "."
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ]

    console.log(allSquares[4])

    winningCombos.forEach(array => {
        let circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('círculo'))
        
        if (circleWins) {
            infoDisplay.textContent = "Círculo gana!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
    })

    winningCombos.forEach(array => {
        let crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cruz'))
        
        if (crossWins) {
            infoDisplay.textContent = "Cruz gana!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
    })

}