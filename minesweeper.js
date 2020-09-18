document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
let board = {}
let defaultLevel = 4

function startGame () {
   generateBoard(defaultLevel)
   countMines()
   lib.initBoard()
   addCheckWinListeners()
}

function changeLevel(n){
   defaultLevel = n
   restart()
}

function playAgain(){
   showButton()
   button.addEventListener("click", function(){
      restart()
   })
}

function restart(){
   hideButton()
   deleteBoard()
   generateBoard(defaultLevel)
   countMines()
   lib.initBoard()
   addCheckWinListeners()
}
//-----------RESTART() FUNCTIONS START-----------------

function hideButton(){
   let button = document.querySelector("#button")
   button.classList.add("hide")
}

function deleteBoard(){
   document.querySelector(".board").innerHTML = ""
}

function generateBoard(n){
   board.cells = []
   let rowCount = 0
   for(let i = 0; i < n*n; i++){
      board.cells[i] = {
         row: Math.floor(rowCount),
         col: (n + i) % n,
         hidden: true,
         isMine: Math.random() > 0.8,
         isMarked: false
      }
      rowCount += (1/n + .001)
   }
}

function countMines (){
   for(let i = 0; i < board.cells.length; i++){
      board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
   }
}

function addCheckWinListeners(){
   document.querySelector(".board").addEventListener("click", checkForWin)
   document.querySelector(".board").addEventListener("contextmenu", checkForWin)
}

//-------------RESTART() FUNCTIONS END----------------------

function showButton(){
   let button = document.querySelector("#button")
   button.classList.remove("hide")
}

function checkForWin () {
   for(let i = 0; i < board.cells.length; i++){
      if(board.cells[i].isMine === true && board.cells[i].isMarked === false) return
      if(board.cells[i].isMine === false && board.cells[i].hidden === true) return
   }
   lib.displayMessage('You win!')
   playAgain()
} 

function countSurroundingMines (cell) {
   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
   let count = 0
   for(let i = 0; i < surrounding.length; i++){
      if(surrounding[i].isMine) count ++
   }
   return count
}

