class SudokuSolver {

  validate(puzzleString) {
    const rxCharSet = new RegExp(/[\d|\.]{81}/);
    const ERR_SIZE = new Error('Expected puzzle to be 81 characters long');
    const ERR_CHARSET = new Error('Invalid characters in puzzle');
    const ERR_INVALID = new Error('Puzzle cannot be solved');
    if (puzzleString.length != 81) {
      return ERR_SIZE;
    } else if (!rxCharSet.test(puzzleString)) {
      return ERR_CHARSET
    } else if (!this.checkIfValidSudoku(puzzleString)) {
      return ERR_INVALID;
    }
  }

  getGridLowHigh(num) {
    let res;
    if (num < 3) {
      res = [0, 1, 2];
    } else if (num >= 3 && num < 6) {
      res = [3, 4, 5];
    } else {
      res = [6, 7, 8];
    }
    return res;
  }

  checkIfValidSudoku(puzzleString) {
    const puzzleArr = puzzleString.match(/.{1,9}/g);

    for (let num = 0; num <= 8; num++) {
      const rowArr = puzzleArr[num].split('');
      let columnArr = [];
      puzzleArr.forEach(e => { columnArr.push(e[num]) });
      let region = [];
      const r = this.getGridLowHigh(num);
      const c = this.getGridLowHigh(num);
      puzzleArr.slice(r.low, r.high).forEach(e => { region.push(e.slice(c.low, c.high).split('')) })

      if (hasDuplicates(rowArr.filter(e => e !== ".")) ||
        hasDuplicates(columnArr.filter(e => e !== ".")) ||
        hasDuplicates(region.filter(e => e !== "."))
      ) {
        return false;
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const puzzleArr = puzzleString.match(/.{1,9}/g);
    const rowArr = puzzleArr[row].split('');
    if (rowArr.indexOf(value.toString()) !== column && rowArr.includes(value.toString())) {
      return "row";
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    const puzzleArr = puzzleString.match(/.{1,9}/g);
    let columnArr = [];
    puzzleArr.forEach(e => { columnArr.push(e[column]) });
    if (columnArr.indexOf(value.toString()) !== row && columnArr.includes(value.toString())) {
      return "column";
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const puzzleArr = puzzleString.match(/.{1,9}/g);
    let region = [];
    const r = this.getGridLowHigh(row);
    const c = this.getGridLowHigh(column);

    const minRow = Math.min(...r);
    const minCol = Math.min(...c);
    const maxRow = Math.max(...r);
    const maxCol = Math.max(...c);

    puzzleArr.slice(minRow, maxRow+1).forEach(e => { region.push(e.slice(minCol, maxCol+1).split('')) });

    const regionRow = r.indexOf(row);
    const regionCol = c.indexOf(column);
    if (region[regionRow][regionCol] !== value.toString() && region.join('').includes(value.toString())) {
      return "region";
    }
  }

  isInvalidValue(puzzleString, row, column, value) {
    const rowCheck = this.checkRowPlacement(puzzleString, row, column, value);
    const columnCheck = this.checkColPlacement(puzzleString, row, column, value);
    const regionCheck = this.checkRegionPlacement(puzzleString, row, column, value);
    if (rowCheck || columnCheck || regionCheck) {
      return [rowCheck, columnCheck, regionCheck].filter((c) => c);
    }
  }

  nextEmptyValue(puzzleString) {
    const puzzleArr = puzzleString.match(/.{1,9}/g);
    const iRow = puzzleArr.findIndex(row => row.split('').find(column => column === '.'));
    if (iRow >= 0) {
      const iColumn = puzzleArr[iRow].split('').findIndex(column => column === '.');
      return [iRow, iColumn];
    } else {
      return [iRow];
    }
  }

  addValueToStr(puzzleStr, row, column, number) {
    let puzzle = puzzleStr.match(/.{1,9}/g);
    let rowArr = puzzle[row].split('');
    rowArr.splice(column, 1, number);
    puzzle.splice(row, 1, rowArr.join(''));
    return puzzle.join('');
  }

  solve(puzzleString) {
    const emptyValue = this.nextEmptyValue(puzzleString);
    const row = emptyValue[0];
    const column = emptyValue[1];
    if (row === -1) { return puzzleString; }

    for (let num = 1; num <= 9; num++) {
      if (!this.isInvalidValue(puzzleString, row, column, num)) {
        const newStr = this.addValueToStr(puzzleString, row, column, num);
        puzzleString = this.solve(newStr);
      }
    }

    if (this.nextEmptyValue(puzzleString)[0] !== -1) {
      puzzleString = this.addValueToStr(puzzleString, row, column, ".");
    }

    return puzzleString;
  }
}

module.exports = SudokuSolver;

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}
