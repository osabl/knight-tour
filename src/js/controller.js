import ChessBoard from './model/board.js'
import Knight from './model/knight.js'
import Board from './view.js'

const boardForm = document.querySelector('.create-board')
const createBtn = document.querySelector('#create-board')

boardForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const colums = boardForm.querySelector('#width').value
  const rows = boardForm.querySelector('#height').value

  const x = boardForm.querySelector('#startX').value
  const y = boardForm.querySelector('#startY').value

  const board = new Board('.app', { rows, colums })
  const chessBoard = new ChessBoard(colums, rows)
  const knight = new Knight(chessBoard, x - 1, y - 1)

  findWay(knight)
  board.showWay(chessBoard.way)
})


function findWay(knight) {
  const movement = getOptimalMovement(knight)

  for (const move of movement) {
    if (!knight.board.isAllFilled()) {
      knight.move(move)
      findWay(knight)
    } else {
      break
    }
  }

  if (!knight.board.isAllFilled()) {
    knight.moveBack()
  }
}

function getOptimalMovement(knight) {
  let possibleMoves = knight.board.getPossibleMoves(Knight.movement, knight.x, knight.y)

  possibleMoves.sort((moveA, moveB) => {
    const xA = knight.x + moveA.x
    const yA = knight.y + moveA.y
    const xB = knight.x + moveB.x
    const yB = knight.y + moveB.y

    const a = knight.board.getPossibleMoves(Knight.movement, xA, yA).length
    const b =  knight.board.getPossibleMoves(Knight.movement, xB, yB).length

    return a - b
  })

  return possibleMoves
}