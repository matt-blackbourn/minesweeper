document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
let board = {}

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

function changeLevel(n){
   document.querySelector(".board").innerHTML = ""
   generateBoard(n)
   countMines()
   lib.initBoard()
   addCheckWinListeners()
}

function startGame () {
   generateBoard(3)
   countMines()
   lib.initBoard()
   addCheckWinListeners()
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

function checkForWin () {
   for(let i = 0; i < board.cells.length; i++){
      if(board.cells[i].isMine === true && board.cells[i].isMarked === false) return
      if(board.cells[i].isMine === false && board.cells[i].hidden === true) return
   }
   lib.displayMessage('You win!')
   playAgain()
} 

function playAgain(){
   let button = document.querySelector("#button")
   button.classList.remove("hide")
   button.addEventListener("click", function(){
      document.querySelector(".board").innerHTML = ""
      button.classList.add("hide")
      startGame()
   })
}

function countSurroundingMines (cell) {
   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
   let count = 0
   for(let i = 0; i < surrounding.length; i++){
      if(surrounding[i].isMine) count ++
   }
   return count
}

