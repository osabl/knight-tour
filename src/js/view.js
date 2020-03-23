export default class View {
  constructor (element, options) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.canvas.height = options.resolution
    this.colums = options.colums
    this.rows = options.rows
    
    this.status = document.createElement('h3')
    this.phase = 'init'

    this.renderBoard()
    element.append(this.status)
    element.append(this.canvas)
  }

  set phase (phase) {
    switch (phase) {
      case 'init':
        this.canvas.className = 'chessboard initial'
        this.status.innerText = 'Click on the cell from which you want to start the tour.'
        this.status.className = 'status initial'
        break
      case 'finding':
        this.canvas.className = 'chessboard finding'
        this.status.innerText = 'Finding way... Please wait!'
        this.status.className = 'status finding'
        break
      case 'rendering':
        this.canvas.className = 'chessboard drawing'
        this.status.innerText = "Drawing a found knight's way..."
        this.status.className = 'status drawing'
        break
      case 'success':
        this.canvas.className = 'chessboard success'
        this.status.innerText = 'Done! The knight has found his way.'
        this.status.className = 'status success'
        break
      case 'failed':
        this.canvas.className = 'chessboard failed'
        this.status.innerText = `It's impossible to find a way out of these coordinates. 
        Try another cell or other chessboard size.`
        this.status.className = 'status failed'
        break
      default:
        this.status.innerText = `${phase}`
        break
    }
  }

  renderBoard () {
    const ctx = this.canvas.getContext('2d')
    const size = this.canvas.width / (Number(this.colums) > Number(this.rows) ? this.colums : this.rows)
    const alignMiddle = (this.canvas.width - (size * this.colums)) / 2

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        ctx.fillStyle = (i + j) % 2 ? '#B58863' : '#F0D9B5' // even or odd
        ctx.fillRect(j * size + alignMiddle, i * size, size, size)
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
    const alignMiddle = (this.canvas.width - (size * this.colums)) / 2
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
          ctx.moveTo((way[i - 1].x * size) + size / 2 + alignMiddle, (way[i - 1].y * size) + size / 2)
          ctx.lineTo((way[i].x * size) + size / 2 + alignMiddle, (way[i].y * size) + size / 2)
          ctx.stroke()
          ctx.closePath()
  
          ctx.beginPath()
          ctx.arc((way[i - 1].x * size) + size / 2 + alignMiddle, (way[i - 1].y * size) + size / 2, radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()
  
          ctx.fillStyle = 'green'

          ctx.beginPath()
          ctx.arc((way[i].x * size) + size / 2 + alignMiddle, (way[i].y * size) + size / 2, radius, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()

          ctx.fillStyle = 'white'

          ctx.beginPath()
          ctx.fillText(`${i - 1}`, (way[i - 1].x * size) + size / 2 + alignMiddle, (way[i - 1].y * size) + size / 2, size / 2)
          ctx.fillText(`${i}`, (way[i].x * size) + size / 2 + alignMiddle, (way[i].y * size) + size / 2, size / 2)
          ctx.closePath()

          resolve()
        }, i * 6400 / (this.colums * this.rows))
      }))
    }

    await Promise.all(promises)
  }

  getSelectedCell (x, y) {
    const size = this.canvas.width / (Number(this.colums) > Number(this.rows) ? this.colums : this.rows)
    const alignMiddle = (this.canvas.width - (size * this.colums)) / 2

    const newX = Math.floor((x - alignMiddle) / size)
    const newY = Math.floor(y / size)
    return { x: newX, y: newY }
  }
}