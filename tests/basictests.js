var test = require('tape');
var widenBend = require('../index');
var bendToHTML = require('../tools/bend-to-html');
var fs = require('fs');
var queue = require('d3-queue').queue;

const tolerance = 0.001;
var resultHTMLFragments = [];

var testCases = [
  {
    name: '45 degree angle',
    opts: {
      start: [30, 50],
      elbow: [0, 20],
      end: [20, 0],
      widenDistance: 20
    },
    expected: [
      [-20, 20],
      [20, 20]
    ]
  },

  {
    name: '135 degree angle',
    opts: {
      start: [0, 100],
      elbow: [-50, 50],
      end: [-50, 0],
      widenDistance: 130
    },
    expected: [
       [-170.104, 99.748],
       [70.104, 0.251] 
    ]
  },

  {
    name: 'Narrow angle',
    opts: {
      start: [-200, -49],
      elbow: [97, 3],
      end: [-183, 30],
      widenDistance: 32
    },
    expected: [
      [128.976, 4.235],
      [65.024, 1.765]
    ]
  },

  {
    name: 'Straight line',
    opts: {
      start: [-64, -64],
      elbow: [-10, -10],
      end: [111, 111],
      widenDistance: 80
    },
    expected: [
      [128.976, 4.235],
      [65.024, 1.765]
    ]
  }
];

((function go() {
  var q = queue(1);
  testCases.forEach(queueTestRun);
  q.awaitAll(writeOutHTMLFragments)

  function queueTestRun(testCase) {
    q.defer(runTest, testCase);
  }
})());

function runTest(testCase, done) {
  test(testCase.name, basicTest);

  function basicTest(t) {
    var widenPoints = widenBend(testCase.opts);

    resultHTMLFragments.push(bendToHTML({
      title: testCase.name,
      bendProperties: testCase.opts,
      widenPoints: widenPoints
    }));
    console.log(widenPoints);
    widenPoints.forEach(comparePair);
    t.end();
    done();

    function comparePair(pair, i) {
      t.ok(
        Math.abs(pair[0] - testCase.expected[i][0]) < tolerance &&
        Math.abs(pair[1] - testCase.expected[i][1]) < tolerance,
        'Widen point is correct.'
      );
    }
  }
}

function writeOutHTMLFragments() {
  const html = `<html>
  <head>
    <style>
      path {
        fill: none;
        stroke: black;
        stroke-width: 1;
      }
    </style>
  </head>

  <body>
  ${resultHTMLFragments.join('\n')}
  </body>
  </html>
   `;
   var filepath = __dirname + '/basic-test-results.html';
   fs.writeFileSync(filepath, html);
  console.log('Wrote rendered test results to', filepath);
}
