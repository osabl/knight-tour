export default class ChessBoard { 
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
          used: false
        }

        row.push(cell)
      }

      this.table.push(row)
    }
  }

  getPossibleMoves (movements, x, y) {
    const cell = this.getCell(x, y)
    const possibleMoves = []

    for (const key in movements) {
      const x = cell.x + movements[key].x
      const y = cell.y + movements[key].y

      try {
        if (!this.table[y][x].used) {
          possibleMoves.push(this.table[y][x])
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