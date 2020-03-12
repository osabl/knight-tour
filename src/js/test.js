import ChessBoard from './chessBoard.js'
import Knight from './knight.js'

const chessBoard = new ChessBoard()
const knight = new Knight(chessBoard)
// printBoard(chessBoard)
// printHistory(chessBoard)

setTimeout(() => {
  knight.move(Knight.movement.UR)
}, 2000)
setTimeout(() => {
  printHistory(chessBoard)
}, 3000)
setTimeout(() => {
  printBoard(chessBoard)
}, 5000)
setTimeout(() => {
  console.log(chessBoard.getPossibleMoves(Knight.movement, 0, 0).length)
  console.log(chessBoard.getPossibleMoves(Knight.movement, 1, 2).length)
}, 10000)


function printBoard (chessBoard) {
  console.log('===== PRINT BOARD =====')

  for (let i = 0; i < chessBoard.table.length; i++) {
    for (let j = 0; j < chessBoard.table[i].length; j++) {
      setTimeout(() => {
        console.log('----------')
        console.log(chessBoard.table[i][j])
      }, (i+j)*100)
    }
  }
}

function printHistory (chessBoard) {
  console.log('===== PRINT BOARD HISTORY =====')

  for (let move of chessBoard.history) {
    console.log(move)
  }
}