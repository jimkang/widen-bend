var test = require('tape');
var widenBend = require('../index');
var bendToHTML = require('../tools/bend-to-html');

var testCases = [
  {
    name: '45 degree angle',
    opts: {
      start: [3, 5],
      elbow: [0, 2],
      end: [2, 0],
      widenDistance: 2
    },
    expected: [
      [-2, 2],
      [2, 2]
    ]
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, function basicTest(t) {
    var widenPoints = widenBend(testCase.opts);
    var filepath = testCase.name + '.html';
    bendToHTML({
      htmlFilepath: filepath,
      bendProperties: testCase.opts,
      widenPoints: widenPoints,
      scale: 30
    });
    console.log('Wrote bend and widen points to', filepath);
    t.deepEqual(widenPoints, testCase.expected, 'Widen points are correct.');
    t.end();
  });
}
