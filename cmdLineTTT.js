const prompt = require('prompt');

class Board {
  constructor(size) {
    this.board = new Array(size).fill(0).map(col => new Array(size).fill(' ~ '));
    this.turn = true;

    this.markers = {
      'P1' : ' X ',
      'P2' : ' O '
    }
  }

  checkBoard () {
    const board = this.board;
    const length = board.length;
    let row = 0;
    let col = 0;
    let pieces = {};
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[row].length; j++) {
        pieces[board[row][i]] = (pieces[board[row][i]] || 1) + 1;
      }
      if (pieces[' X '] === length || pieces[' O '] === length) {
        console.log('winner');
      }
    }
  }

  printBoard () {
    let boardToPrint = this.board.map(row => row.join(' | ')).join('\n');
    console.log(boardToPrint);
  }

  play () {
    let player = this.turn === true ? 'P1' : 'P2';
    prompt.get(['row', 'col'], (err, result) => {
      if (err) {
      } else {
        let row = Number(result.row)
        let col = Number(result.col)
        if (result.row === '9') {
          return
        }
        this.board[row][col] = this.markers[player];
        this.turn = !this.turn;
        this.printBoard();
        this.checkBoard();
        this.play();
      }
    })
  }
}


prompt.start();
let start = new Promise(resolve => {
  prompt.get(['size'], (err, result) => {
    if (err) {
    } else {
      resolve(result.size);
    }
  });
})
start.then(result => {
    let board = new Board(Number(result));
    board.printBoard();
    board.play();
})
