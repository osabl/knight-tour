export default class Knight {
  constructor (board, options) {
    this.x = 0
    this.y = 0
    this.board = board
    this.movement = {
      UL: { x: -1, y:  2, description: 'up left'    },
      UR: { x:  1, y:  2, description: 'up right'   },
      RU: { x:  2, y:  1, description: 'right up'   },
      RD: { x:  2, y: -1, description: 'right down' },
      DR: { x:  1, y: -2, description: 'down right' },
      DL: { x: -1, y: -2, description: 'down left'  },
      LD: { x: -2, y: -1, description: 'left down'  },
      LU: { x: -2, y:  1, description: 'left up'    },
    }

    if (board.colums >= options.x && board.rows >= options.y) {
      this.move({ x: Number(options.x), y: Number(options.y), description: 'start position' })
    } else {
      throw new Error('The value of the coordinates went beyond the border of the board.')
    }
  }

  move ({ x, y, description }) {
    const newX = this.x += x
    const newY = this.y += y

    this.board.table[newY][newX].used = true
    this.board.way.push({ x: newX, y: newY, description })
  }

  moveBack () {
    const board = this.board

    board.table[this.y][this.x].used = false
    board.way.pop()
    
    if (board.way.length > 0) {
      const lastMove = board.way[board.way.length -1]
      this.x = lastMove.x
      this.y = lastMove.y
    }
  }
}