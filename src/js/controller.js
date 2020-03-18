import ChessBoard from './model/board.js'
import Knight from './model/knight.js'
import View from './view.js'

const input = {
  width: document.querySelector('#width'),
  height: document.querySelector('#height')
}
const viewBoard = new View('#app', { 
  rows: input.height.value, 
  colums: input.width.value, 
  resolution: 1000 
})
const chessBoard = new ChessBoard({ 
  rows: input.height.value, 
  colums: input.width.value 
})

input.width.addEventListener('input', changeSize('colums', 'width'))
input.height.addEventListener('input', changeSize('rows', 'height'))

viewBoard.canvas.addEventListener('click', function start (event) {
  const coord = getCursorPosition(viewBoard.canvas, event)
  const relativeCoord = viewBoard.getSelectedCell(coord.x, coord.y)
  const knight = new Knight(chessBoard, relativeCoord)

  findWay(knight)

  if (chessBoard.way.length > 0) {
    viewBoard.canvas.removeEventListener('click', start)
    input.width.disabled = true
    input.height.disabled = true
    viewBoard.renderWay(chessBoard.way).then(() => {
      input.width.disabled = false
      input.height.disabled = false
    })
  } else {
    alert('It`s impossible to find a way out of these coordinates')
  }
})

function changeSize (prop, value) {
  return () => {
    chessBoard.clearTable()
    chessBoard[prop] = input[value].value
    chessBoard.fillTable()

    viewBoard.clearBoard()
    viewBoard[prop] = input[value].value
    viewBoard.renderBoard()
  }
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const ratio = canvas.width / (rect.right - rect.left)
  const x = (event.clientX - rect.left) * ratio
  const y = (event.clientY - rect.top) * ratio
  return { x, y }
}

function findWay (knight) {
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

function getOptimalMovement (knight) {
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