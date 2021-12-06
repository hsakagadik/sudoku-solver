const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzleStrings = require('../controllers/puzzle-strings').puzzlesAndSolutions;
let solver = new Solver();

suite('UnitTests', () => {
    const validString = puzzleStrings[0][0];
    const solution = puzzleStrings[0][1];

    test('Logic handles a valid puzzle string of 81 characters', function () {
        assert.isTrue(solver.validate(validString), 'a valid puzzle string should retrieve true');
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
        const s = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.deepEqual(solver.validate(s).message, 'Invalid characters in puzzle');
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function () {
        const s = '..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.deepEqual(solver.validate(s).message, 'Expected puzzle to be 81 characters long');
    });

    test('Logic handles a valid row placement', function () {
        assert.isFalse(solver.checkRowPlacement(validString, 2, 7), 'a valid row placement should retrieve false');
    });

    test('Logic handles a valid column placement', function () {
        assert.isFalse(solver.checkColPlacement(validString, 2, 4), 'a valid col placement should retrieve false');
    });

    test('Logic handles an invalid column placement', function () {
        assert.isTrue(solver.checkColPlacement(validString, 2, 9), 'an invalid col placement should retrieve true');
    });

    test('Logic handles a valid region (3x3 grid) placement', function () {
        assert.isFalse(solver.checkRegionPlacement(validString, 5, 0, 5), 'a valid grid placement should retrieve false');
    });

    test('Logic handles an invalid region (3x3 grid) placement', function () {
        assert.isTrue(solver.checkRegionPlacement(validString, 5, 0, 7), 'an invalid grid placement should retrieve true');
    });

    test('Valid puzzle strings pass the solver', function () {
        assert.deepEqual(solver.solve(validString), solution, 'a valid string should be resolved');
    });

    test('Invalid puzzle strings fail the solver', function () {
        const invalidString = '5..91311.3...8.5.1.1.21..8.68.17.23...95..46.7.1.....5.2.......1..8911..85.12...1';
        assert.deepEqual(solver.validate(invalidString).message, 'Puzzle cannot be solved', 'an invalid sudoku string should fail');
    });

    test('Solver returns the expected solution for an incomplete puzzle', function () {
        const incompletePuzzle = '1.5..2.....63.12.7.2..5.....9..1....8.2.36...3.7.2..9.47...8..1..16....926914.37.';
        assert.deepEqual(solver.solve(incompletePuzzle), solution, 'an incomplete sudoku string should be resolved');
    });
});
