const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleStrings = require('../controllers/puzzle-strings').puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  const validPuzzle = puzzleStrings[0][0];
  const solutionPuzzle = puzzleStrings[0][1];

  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
    const body = { puzzle: validPuzzle };
    chai.request(server)
      .post('/api/solve')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, { solution: solutionPuzzle });
        done();
      });
  });

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
    const body = {};
    const errorResponse = { error: 'Required field missing' };
    chai.request(server)
      .post('/api/solve')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
    const invalidChars = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const body = { puzzle: invalidChars };
    const errorResponse = { error: 'Invalid characters in puzzle' };
    chai.request(server)
      .post('/api/solve')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
    const invalidLength = '..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const body = { puzzle: invalidLength };
    const errorResponse = { error: 'Expected puzzle to be 81 characters long' };
    chai.request(server)
      .post('/api/solve')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
    const invalidSudoku = '1..11111.1...8.5.1.1.21..8.68.17.23...95..46.7.1.....5.2.......1..8911..85.12...1';
    const body = { puzzle: invalidSudoku };
    const errorResponse = { error: 'Puzzle cannot be solved' };
    chai.request(server)
      .post('/api/solve')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "A2", value: "3" };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, { valid: true });
        done();
      });
  });

  test('Check a puzzle placement that is already placed: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "A1", value: "1" };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, { valid: true });
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "A3", value: "4" };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, { valid: false, conflict: ['row'] });
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "A2", value: "5" };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, { valid: false, conflict: ['row', 'region'] });
        done();
      });
  });

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "C5", value: "2" };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column', 'region'] });
        done();
      });
  });

  test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, value: "5" };
    const errorResponse = { error: 'Required field(s) missing' };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });


  test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
    const invalidChars = '..A..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const body = { puzzle: invalidChars, coordinate: "A2", value: "3" };
    const errorResponse = { error: 'Invalid characters in puzzle' };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
    const invalidLength = '..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const body = { puzzle: invalidLength, coordinate: "A2", value: "3" };
    const errorResponse = { error: 'Expected puzzle to be 81 characters long' };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "Z5", value: "5" };
    const errorResponse = { error: 'Invalid coordinate' };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
    const body = { puzzle: validPuzzle, coordinate: "B5", value: "11" };
    const errorResponse = { error: 'Invalid value' };
    chai.request(server)
      .post('/api/check')
      .send(body)
      .end(function (err, res) {
        assert.deepEqual(res.body, errorResponse);
        done();
      });
  });

});

