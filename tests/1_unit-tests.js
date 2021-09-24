const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
    test('Logic handles a valid puzzle string of 81 characters', function(){
        assert.fail();
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(){
        assert.fail();
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function(){
        assert.fail();
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
