export default class Board {
  constructor (selector, options = {
    rows: 8,
    colums: 8,
  }) {
    const app = document.querySelector(selector)

    this.board = document.createElement('table')
    this.board.className = 'chessboard'
  
    for (let i = 0; i < options.rows; i++) {
      const row = document.createElement('tr')
      
      for (let j = 0; j < options.colums; j++) {
        const cell = document.createElement('td')
        cell.className = `cell ${(i + j) % 2 ? 'even' : 'odd'}`
        
        row.append(cell)
      }
  
      this.board.append(row)
    }

    app.append(this.board)
  }

  showWay(way, options = {
    animation: true,
    delay: 500,
  }) {
    if (options.animation) {
      for (let i = 0; i < way.length; i++) {
        setTimeout(() => {
          this.board.rows[way[i].y].cells[way[i].x].innerText = i + 1
        }, options.delay * i)    
      }
    }
    
  }
}