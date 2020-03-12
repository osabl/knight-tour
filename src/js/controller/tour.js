import ChessBoard from '../model/board.js'
import Knight from '../model/knight.js'


const board = new ChessBoard(8, 8)
const knight = new Knight(board, 0, 1)
findWay(knight)
console.log(board.history)


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