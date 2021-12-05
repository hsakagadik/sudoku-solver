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

  getGrid(num){
    let res;
    if(num < 3){
      res = {low: 0, high: 3}
    } else if(num >= 3 && num < 6){
      res = {low: 3, high: 6}
    } else {
      res = {low: 6, high: 9}
    }
    return res;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const arr = puzzleString.match(/.{1,9}/g);
    return arr[row].split('').includes(value.toString());
  }

  checkColPlacement(puzzleString, row, column, value) {
    const arr = puzzleString.match(/.{1,9}/g);
    let columnArr = [];
    arr.forEach(e => {columnArr.push(e[column])});
    return columnArr.includes(value.toString());
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const arr = puzzleString.match(/.{1,9}/g);
    let region = [];
    const r = this.getGrid(row);
    const c = this.getGrid(column);
    arr.slice(r.low,r.high).forEach(e => {region.push(e.slice(c.low,c.high).split(''))})
    return region.join('').includes(value.toString());
  }

  checkValue(puzzleString, row, column, value){
    return this.checkRowPlacement(puzzleString, row, column, value) && 
           this.checkColPlacement(puzzleString, row, column, value) && 
           this.checkRegionPlacement(puzzleString, row, column, value);
  }

  nextEmptyValue(puzzleString){
    const puzzleArr = puzzleString.match(/.{1,9}/g);
    const iRow = puzzleArr.findIndex(row => row.split('').find(column => column === '.'));
    if (iRow >= 0){
      const iColumn = puzzleArr[iRow].split('').findIndex(column => column === '.');
      return [iRow, iColumn];
    } else {
      return [iRow];
    }
  }

  addValueToArr(puzzleArr, row, column, number){
    let puzzle = [...puzzleArr];
    let rowArr = puzzle[row].split('');
    rowArr.splice(column, 1, number)
    puzzle.splice(row, 1, rowArr.join(''))
    return puzzle;
  }

  solve(puzzleString) {
    const emptyValue = this.nextEmptyValue(puzzleString);
    const row = emptyValue[0];
    const column = emptyValue[1];

    if (row === -1) { return puzzleString }
    let puzzleArr = puzzleString.match(/.{1,9}/g);

    for (let num = 0; num < 10; num++) {
      if (this.checkValue(puzzleString, row, column, num)) {
        puzzleArr = this.addValueToArr(puzzleArr, row, column, num);
        this.solve(puzzleArr.join(''));
      }
    }
    return puzzleArr.join('');
  }

}

module.exports = SudokuSolver;

