const { expect } = require('chai');
const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters', function(){
        const s = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.isTrue(solver.validate(s), 'a valid puzzle string should retrieve true');
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(){
        const s = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.deepEqual(solver.validate(s).message, 'Invalid characters in puzzle');
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function(){
        const s = '..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.deepEqual(solver.validate(s).message, 'Expected puzzle to be 81 characters long');
    });

    test('Logic handles a valid row placement', function(){
        assert.fail();
    });

    test('Logic handles a valid column placement', function(){
        assert.fail();
    });

    test('Logic handles an invalid column placement', function(){
        assert.fail();
    });

    test('Logic handles a valid region (3x3 grid) placement', function(){
        assert.fail();
    });

    test('Logic handles an invalid region (3x3 grid) placement', function(){
        assert.fail();
    });

    test('Valid puzzle strings pass the solver', function(){
        assert.fail();
    });

    test('Invalid puzzle strings fail the solver', function(){
        assert.fail();
    });
    
    test('Solver returns the expected solution for an incomplete puzzle', function(){
        assert.fail();
    });
});
