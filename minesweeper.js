document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
// var board = {
//    cells: [
//       {
//          row: 0, 
//          col: 0, 
//          isMine: true, 
//          hidden: true
//       },
//       {
//          row: 0, 
//          col: 1, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 0, 
//          col: 2, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 0, 
//          col: 3, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 1, 
//          col: 0, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 1, 
//          col: 1, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 1, 
//          col: 2, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 1, 
//          col: 3, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 2, 
//          col: 0, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 2, 
//          col: 1, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 2, 
//          col: 2, 
//          isMine: true, 
//          hidden: true
//       },
//       {
//          row: 2, 
//          col: 3, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 3, 
//          col: 0, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 3, 
//          col: 1, 
//          isMine: true, 
//          hidden: true
//       },
//       {
//          row: 3, 
//          col: 2, 
//          isMine: false, 
//          hidden: true
//       },
//       {
//          row: 3, 
//          col: 3, 
//          isMine: false, 
//          hidden: true
//       },
//    ]
// }


let board = {}

function generateBoard(n){
  
   board.cells = []
   let rowCount = 0
   
   for(let i = 0; i < n*n; i++){
      
      //still need to figure this out for n rows
      let rowCount
      if(i < 5) rowCount = 0
      if(i > 4 && i < 10) rowCount = 1
      if(i > 9 && i < 15) rowCount = 2
      if(i > 14 && i < 20) rowCount = 3
      if(i > 19 && i < 25) rowCount = 4
   
      board.cells[i] = {
         row: rowCount,
         col: (n + i) % n,
         hidden: true,
         isMine: Math.random() >= 0.7,
         isMarked: false
      }
   }
}


function startGame () {
   
   generateBoard(5)
   
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

