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

    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if (puzzle === "" || puzzle === undefined) { res.json({ error: 'Required field missing' }) }
      const validateRes = solver.validate(puzzle);
      if (typeof validateRes !== 'boolean') {
        res.json({ error: validateRes.message});
      } else if (validateRes) {
        const resString = solver.solve(puzzle);
        res.json(resString);
      }
    });
};
