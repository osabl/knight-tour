export default class View {
  constructor (element, options) {
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'chessboard'
    this.canvas.width = this.canvas.height = options.resolution
    this.colums = options.colums
    this.rows = options.rows
    
    this.status = document.createElement('h3')
    this.status.innerText = 'Click on the cell from which you want to start the tour.'
    this.status.className = 'status initial'

    this.renderBoard()
    element.append(this.status)
    element.append(this.canvas)
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

  clearBoard() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  async renderWay (way) {
    const ctx = this.canvas.getContext('2d')
    const size = this.canvas.width / (Number(this.colums) > Number(this.rows) ? this.colums : this.rows)
    const radius = size / 4
    ctx.lineWidth = size / 30
    ctx.font = `${size / 4}px Roboto, Arial, Helvetica, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const promises = []

    for (let i = 1; i < way.length; i++) {
      promises.push(new Promise((resolve, reject) => {
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

          ctx.fillStyle = 'white'

          ctx.beginPath()
          ctx.fillText(`${i - 1}`, (way[i - 1].x * size) + size / 2, (way[i - 1].y * size) + size / 2, size / 2)
          ctx.fillText(`${i}`, (way[i].x * size) + size / 2, (way[i].y * size) + size / 2, size / 2)
          ctx.closePath()

          resolve()
        }, i * 6400 / (this.colums * this.rows))
      }))
    }

    await Promise.all(promises)
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