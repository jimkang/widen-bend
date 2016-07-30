const d3 = require('d3-shape');
const scaleToFit = require('scale-to-fit');

function bendToHTML(opts, done) {
  const {
    title,
    bendProperties,
    widenPoints,
    scale
  } = opts;

  const line = d3.line();
  line.curve(d3.curveLinear);

  const bounds = getBounds([
    bendProperties.start,
    bendProperties.elbow,
    bendProperties.end,
    widenPoints[0],
    widenPoints[1]
  ]);

  const boardWidth = 480;
  const boardHeight = 480;
  const margin = 20;

  var matrixPoints = scaleToFit({
    view: {
      left: 0,
      top: 0,
      right: boardWidth - 2 * margin,
      bottom: boardHeight - 2 * margin
    },
    content: bounds
  });

  matrixPoints[4] += margin;
  matrixPoints[5] += margin;

  return `  <p>${title}</p>
    <svg width="${boardWidth}" height="${boardHeight}">
      <g transform="matrix(${matrixPoints.join(' ')})">
        <path d=${getBendPath(bendProperties)}></path>
        <path d=${line(widenPoints)}></path>
      </g>
    </svg>
    `;

  function getBendPath(bendProperties) {
    return line(
      [bendProperties.start, bendProperties.elbow, bendProperties.end]
    );
  }
}

function getBounds(points) {
  var left = 0;
  var right = 0;
  var top = 0;
  var bottom = 0;

  points.forEach(updateBoundsForPoint);

  function updateBoundsForPoint(point) {
    if (point[0] < left) {
      left = point[0];
    }
    else if (point[0] > right) {
      right = point[0];
    }

    if (point[1] < top) {
      top = point[1];
    }
    else if (point[1] > bottom) {
      bottom = point[1];
    }
  }

  return {
    left: left,
    right: right,
    bottom: bottom,
    top: top
  };
}

module.exports = bendToHTML;
