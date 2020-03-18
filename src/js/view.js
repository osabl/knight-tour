export default class View {
  constructor (selector, options) {
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'chessboard'
    this.canvas.width = options.resolution
    this.canvas.height = options.resolution
    this.colums = options.colums
    this.rows = options.rows

    this.renderBoard()
    document.querySelector(selector).append(this.canvas)
  }

  renderBoard () {
    const ctx = this.canvas.getContext('2d')
    const size = this.canvas.width / (Number(this.colums) > Number(this.rows) ? this.colums : this.rows)

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        ctx.fillStyle = (i + j) % 2 ? '#B58863' : '#F0D9B5' // even or odd
        ctx.fillRect(j * size, i * size, size, size)
      }
    }
  }

  renderWay (way) {
    const ctx = this.canvas.getContext('2d')
    const size = this.canvas.width / (Number(this.colums) > Number(this.rows) ? this.colums : this.rows)
    const radius = size / 4
    ctx.lineWidth = size / 30

    for (let i = 1; i < way.length; i++) {
      setTimeout(() => {
        ctx.fillStyle = i === 1 ? 'red' : 'black'

        ctx.beginPath()
        ctx.moveTo((way[i - 1].x * size) + size / 2, (way[i - 1].y * size) + size / 2)
        ctx.lineTo((way[i].x * size) + size / 2, (way[i].y * size) + size / 2)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc((way[i - 1].x * size) + size / 2, (way[i - 1].y * size) + size / 2, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.fillStyle = 'green'

        ctx.beginPath()
        ctx.arc((way[i].x * size) + size / 2, (way[i].y * size) + size / 2, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }, i * 6400 / (this.colums * this.rows))
    }
  }

  getSelectedCell (x, y) {
    const ctx = this.canvas.getContext('2d')
    const size = this.canvas.width / (Number(this.colums) > Number(this.rows) ? this.colums : this.rows)
    const radius = size / 4

    const newX = Math.floor(x / size)
    const newY = Math.floor(y / size)
    return { x: newX, y: newY }
  }
}