class SudokuSolver {

  validate(puzzleString) {
    const rxCharSet = new RegExp(/[\d|\.]{81}/);
    const ERR_SIZE = new Error('Expected puzzle to be 81 characters long');
    const ERR_CHARSET = new Error('Invalid characters in puzzle');
    if(puzzleString.length != 81){
      return ERR_SIZE;
    }
    return rxCharSet.test(puzzleString) ? true : ERR_CHARSET;
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

