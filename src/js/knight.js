class ChessBoard { 
  constructor (width = 8, height = 8) {
    this.width = width
    this.height = height
    this.area = this.width * this.height
    this.history = []
    this.table = []

    for (let y = 0; y < height; y++) {
      let row = []

      for (let x = 0; x < width; x++) {
        const cell = {
          x,
          y,
          used: false,

          stay() {
            if (!this.used) {
              this.used = true
              return true
            } else {
              return false
            }
          },

          undo () {
            if (this.used) {
              this.used = false
              return true
            } else {
              return false
            }
          }
        }

        row.push(cell)
      }

      this.table.push(row)
    }
  }
}

class Knight {
  constructor (board, x = 0, y = 0) {
    this.x = x
    this.y = y
    this.board = board

      
    if (board.width >= x && board.height >= y) {
      this.move({ x, y, description: 'start position' })
    } else {
      throw new Error('The value of the coordinates went beyond the border of the board.')
    }
  }

  static movement = {
    UL: { x: -1, y:  2, description: 'up left'    },
    UR: { x:  1, y:  2, description: 'up right'   },
    RU: { x:  2, y:  1, description: 'right up'   },
    RD: { x:  2, y: -1, description: 'right down' },
    DR: { x:  1, y: -2, description: 'down right' },
    DL: { x: -1, y: -2, description: 'down left'  },
    LD: { x: -2, y: -1, description: 'left down'  },
    LU: { x: -2, y:  1, description: 'left up'    },
  }

 

  move ({ x, y, description}) {
    this.x += x
    this.y += y

    this.board.table[y][x].stay()

    this.board.history.push({ x, y, description })
  }
}


// ----- FOR TESTING -----

const chessBoard = new ChessBoard()
const knight = new Knight(chessBoard)
printBoard(chessBoard)
printHistory(chessBoard)

setTimeout(() => {
  knight.move(Knight.movement.UR)
}, 2000)
setTimeout(() => {
  printBoard(chessBoard)
}, 5000)
setTimeout(() => {
  printHistory(chessBoard)
}, 5000)


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