export default class ChessBoard {
  constructor (options) {
    this.colums = options.colums
    this.rows = options.rows
    this.way = []
    this.table = []

    this.fillTable()
  }

  fillTable () {
    for (let y = 0; y < this.rows; y++) {
      const row = []

      for (let x = 0; x < this.colums; x++) {
        const cell = {
          x,
          y,
          used: false
        }

        row.push(cell)
      }

      this.table.push(row)
    }
  }

  clearTable () {
    this.table = []
  }

  getPossibleMoves (movements, x, y) {
    const cell = this.getCell(x, y)
    const possibleMoves = []

    for (const key in movements) {
      const newX = cell.x + movements[key].x
      const newY = cell.y + movements[key].y

      try {
        if (!this.table[newY][newX].used) {
          possibleMoves.push(movements[key])
        }
      } catch {
        continue
      }
    }

    return possibleMoves
  }

  getCell (x, y) {
    return this.table[y][x]
  }

  isAllFilled () {
    for (const row of this.table) {
      for (const cell of row) {
        if (!cell.used) {
          return false
        }
      }
    }

    return true
  }
}
