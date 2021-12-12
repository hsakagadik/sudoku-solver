'use strict';

const cors = require('cors');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.use(cors({
    origin: '*'
  }));

  app.route('/api/check')
    .post((req, res) => {
      if (req.body.puzzle === undefined || req.body.coordinate === undefined || req.body.value === undefined) { res.json({ error: 'Required field(s) missing' }); }
      const puzzle = req.body.puzzle;
      const coordinates = req.body.coordinate.split('');
      const value = Number(req.body.value);
      if (value < 1 || value > 9 || isNaN(value)) { res.json({ error: 'Invalid value' }); }

      const reference = ["A", "B", "C", "D", "E", "F", "G", "H"];
      const row = reference.indexOf(coordinates[0].toUpperCase());
      if (row === -1) { res.json({ error: 'Invalid coordinate' }); }
      const column = coordinates[1] - 1;

      const isInvalidPuzzle = solver.validate(puzzle);
      if (isInvalidPuzzle) {
        res.json({ error: isInvalidPuzzle.message });
      } else {
        const isInvalidValue = solver.isInvalidValue(puzzle, row, column, value);
        if (!isInvalidValue) {
          res.json({ valid: true });
        } else {
          res.json({ valid: false, conflict: isInvalidValue });
        }
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if (puzzle === "" || puzzle === undefined) { res.json({ error: 'Required field missing' }); }
      const isInvalidPuzzle = solver.validate(puzzle);
      if (isInvalidPuzzle) {
        res.json({ error: isInvalidPuzzle.message });
      } else {
        const resString = solver.solve(puzzle);
        res.json({ solution: resString });
      }
    });
};
