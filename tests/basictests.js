var test = require('tape');
var widen-bend = require('../index');

var testCases = [
  {
    opts: {
    },
    expected: {
    }
  },
  {
    opts: {
    },
    expected: {
    }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    t.end();
  });
}
