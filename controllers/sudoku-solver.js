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
    const r = getGrid(row);
    const c = getGrid(column);
    arr.slice(r.low,r.high).forEach(e => {region.push(e.slice(c.low,c.high).split(''))})
    return region.filter(e => e.includes(value.toString())).length > 0;
  }

  solve(puzzleString) {
    
  }
}

function getGrid(num){
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

module.exports = SudokuSolver;

