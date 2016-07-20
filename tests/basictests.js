var test = require('tape');
var widenBend = require('../index');

var testCases = [
  {
    opts: {
      start: [3, 5],
      elbow: [0, 2],
      end: [2, 0],
      widenDistance: 2
    },
    expected: [
      [],
      []
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    t.deepEqual(widenBend(testCase.opts), testCase.expected, 'Widen points are correct.');
    t.end();
  });
}
