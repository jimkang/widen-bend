const fs = require('fs');
const d3 = require('d3-shape');

function bendToHTML(opts, done) {
  const {
    htmlFilepath,
    bendProperties,
    widenPoints,
    scale
  } = opts;

  const line = d3.line();
  line.curve(d3.curveLinear);

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
    <svg width="200" height="200">
      <g transform="translate(100, 100)">
        <path d=${getBendPath(bendProperties)}></path>
        <path d=${line(widenPoints.map(scalePoint))}></path>
      </g>
    </svg>
  </body>
  </html>`

  fs.writeFile(htmlFilepath, html, done);

  function scalePoint(point) {
    return [point[0] * scale, point[1] * scale];
  }

  function getBendPath(bendProperties) {
    return line(
      [bendProperties.start, bendProperties.elbow, bendProperties.end].map(scalePoint)
    );
  }
}

module.exports = bendToHTML;
