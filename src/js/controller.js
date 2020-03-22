import ChessBoard from './model/board.js'
import Knight from './model/knight.js'
import View from './view.js'

const app = document.querySelector('#app')
const input = {
  width: document.querySelector('#width'),
  height: document.querySelector('#height')
}
const buttons = {
  width: {
    up: document.querySelector('.width .up'),
    down: document.querySelector('.width .down')
  },
  height: {
    up: document.querySelector('.height .up'),
    down: document.querySelector('.height .down')
  }
}

const view = new View(app, {
  rows: input.height.value,
  colums: input.width.value,
  resolution: 1000
})
const chessBoard = new ChessBoard({
  rows: input.height.value,
  colums: input.width.value
})

/* 
  -------------
    DOM Elements
  -------------
*/

const tryAgainBtn = document.createElement('button')
tryAgainBtn.className = 'try-again'
tryAgainBtn.innerText = 'try again'
tryAgainBtn.addEventListener('click', () => {
  chessBoard.clearTable()
  chessBoard.way = []
  chessBoard.fillTable()

  view.clearBoard()
  view.renderBoard()

  view.canvas.addEventListener('click', handlerStart)
  input.width.disabled = false
  input.height.disabled = false

  view.status.innerText = 'Click on the cell from which you want to start the tour.'
  view.status.className = 'status initial'
  tryAgainBtn.remove()
})

/* 
  -------------
    Listeners
  -------------
*/

// input.width.addEventListener('input', () => setLimits(input.width, input.height, 50))
// input.height.addEventListener('input', () => setLimits(input.height, input.width, 50))
// input.width.addEventListener('input', () => changeSize('colums', input.width.value))
// input.height.addEventListener('input', () => changeSize('rows', input.height.value))

buttons.width.up.addEventListener('click', () => {
  up(input.width)
  setLimits(input.width, input.height, 50)
  changeSize('colums', input.width.value)
})
buttons.width.down.addEventListener('click', () => {
  down(input.width)
  setLimits(input.width, input.height, 50)
  changeSize('colums', input.width.value)
})
buttons.height.up.addEventListener('click', () => {
  up(input.height)
  setLimits(input.height, input.width, 50)
  changeSize('rows', input.height.value)
})
buttons.height.down.addEventListener('click', () => {
  down(input.height)
  setLimits(input.height, input.width, 50)
  changeSize('rows', input.height.value)
})

view.canvas.addEventListener('click', handlerStart)

/* 
  -------------
    Handlers
  -------------
*/

function up(input) {
  input.value++
}

function down(input) {
  input.value--
}

function setLimits(thisElem, thatELem, max) {
  let flag = false
  const firstMin = 3
  const secondMin = 4

  if (thatELem.value == firstMin) {
    flag = true
  }

  if (thisElem.value < firstMin || (flag === true && thisElem.value < secondMin)) {
    if (flag === false) {
      thisElem.value = firstMin
      flag = true
    } else {
      thisElem.value = secondMin
    }
  }
  if (thisElem.value > max) {
    thisElem.value = max
  }
}

function changeSize(propName, value) {
  chessBoard.clearTable()
  chessBoard[propName] = value
  chessBoard.fillTable()

  view.clearBoard()
  view[propName] = value
  view.renderBoard()
}

function handlerStart(event) {
  const coord = getCursorPosition(view.canvas, event)
  const relativeCoord = view.getSelectedCell(coord.x, coord.y)
  const knight = new Knight(chessBoard, relativeCoord)

  view.canvas.removeEventListener('click', handlerStart)

  input.width.disabled = true
  input.height.disabled = true

  view.status.innerText = 'Finding way... Please wait!'
  view.status.className = 'status finding'

  new Promise((resolve, reject) => {
    setTimeout(() => {
      findWay(knight)
      resolve()
    })
  }).then(() => {
    if (chessBoard.way.length > 0) {
      view.status.innerText = "Drawing a found knight's way..."
      view.status.className = 'status drawing'
      view.renderWay(chessBoard.way).then(() => {
        view.status.innerText = 'Done! The knight has found his way.'
        view.status.className = 'status success'

        app.append(tryAgainBtn)
      })
    } else {
      view.status.innerText = `It's impossible to find a way out of these coordinates. 
      Try another cell or other chessboard size.`
      view.status.className = 'status failed'
      app.append(tryAgainBtn)
    }
  })
}

/* 
  -------------
    Functions
  -------------
*/

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const ratio = canvas.width / (rect.right - rect.left)
  const x = (event.clientX - rect.left) * ratio
  const y = (event.clientY - rect.top) * ratio
  return {
    x,
    y
  }
}

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
    const b = knight.board.getPossibleMoves(Knight.movement, xB, yB).length

    return a - b
  })

  return possibleMoves
}