document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

let board = {}

function generateBoard(n){
  
   board.cells = []
   let rowCount = 0
   for(let i = 0; i < n*n; i++){
      
      if(i > (n - 1) && i < (n * 2)) rowCount = 1
      if(i > (n * 2 - 1) && i < (n * 3)) rowCount = 2
      if(i > (n * 3 - 1) && i < (n * 4)) rowCount = 3
      if(i > (n * 4 - 1) && i < (n * 5)) rowCount = 4
      if(i > (n * 5 - 1) ) rowCount = 5
   
      board.cells[i] = {
         row: rowCount,
         col: (n + i) % n,
         hidden: true,
         isMine: Math.random() >= 0.8,
         isMarked: false
      }
   }
}


function startGame () {
   
   generateBoard(6)
   
  // Don't remove this function call: it makes the game work!
  for(let i = 0; i < board.cells.length; i++){
     board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
   
  lib.initBoard()

   document.querySelector(".board").addEventListener("click", checkForWin)
   document.querySelector(".board").addEventListener("contextmenu", checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
   for(let i = 0; i < board.cells.length; i++){
      if(board.cells[i].isMine === true && board.cells[i].isMarked === false) return
      if(board.cells[i].isMine === false && board.cells[i].hidden === true) return
   }
   lib.displayMessage('You win!')
} 

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
 // 
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.


function countSurroundingMines (cell) {
   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
   let count = 0
   for(let i = 0; i < surrounding.length; i++){
      if(surrounding[i].isMine) count ++
   }
   return count
}

