export default class Knight {
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

  move ({ x, y, description }) {
    this.x += x
    this.y += y

    this.board.table[y][x].used = true
    this.board.history.push({ x, y, description })
  }
}