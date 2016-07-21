function widenBend(opts) {
  var a;
  var b;
  var c;
  var p;

  if (opts) {
    a = opts.start;
    b = opts.elbow;
    c = opts.end;
    p = opts.widenDistance;
  }

  var ab = [b[0] - a[0], b[1] - a[1]];
  var bc = [c[0] - b[0], c[1] - b[1]];

  var magnitudeAB = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]);
  var magnitudeBC = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]);

  var magnitudeRatioABToBC = magnitudeAB/magnitudeBC;
  var normalizedBC = bc.map(normalizePointToAB);
  var cPrime = [b[0] + normalizedBC[0], b[1] + normalizedBC[1]];

  var acPrime = [cPrime[0] - a[0], cPrime[1] - a[1]];
  var ePrime = [a[0] + acPrime[0]/2, a[1] + acPrime[1]/2];
  var bePrime = [ePrime[0] - b[0], ePrime[1] - b[1]];
  var magnitudeBToEPrime = getVectorMagnitude(bePrime);

  var be = [bePrime[0]/magnitudeBToEPrime * p, bePrime[1]/magnitudeBToEPrime * p];

  var e = addPairs(b, be);

  var eb = [-1 * be[0], -1 * be[1]];
  var d = addPairs(b, eb);
  return [d, e];

  // TODO: Update approach.jpg.

  function normalizePointToAB(point) {
    return point * magnitudeRatioABToBC;
  }
}

function getVectorMagnitude(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function addPairs(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

module.exports = widenBend;
