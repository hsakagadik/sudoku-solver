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
      try {
        if (req.body.puzzle === "" || req.body.puzzle === undefined) { req.json({ error: 'Required field missing' }) }
        if (solver.validate(req.body.puzzle)) {
          const resString = solver.solve(req.body.puzzle);
          res.json(resString);
        }
      } catch (error) {
        res.send(error);
      }
    });
};
