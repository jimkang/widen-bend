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

  var ab = subtractPairs(b, a);
  var bc = subtractPairs(c, b);
debugger;
  var magnitudeAB = getVectorMagnitude(ab);
  var magnitudeBC = getVectorMagnitude(bc) ;

  var magnitudeRatioABToBC = magnitudeAB/magnitudeBC;
  var normalizedBC = bc.map(normalizePointToAB);
  var cPrime = addPairs(b, normalizedBC);

  var acPrime = subtractPairs(cPrime, a);
  var ePrime = addPairs(a, multiplyPairBySingleValue(acPrime, 0.5));
  var bePrime = subtractPairs(ePrime, b);
  var magnitudeBToEPrime = getVectorMagnitude(bePrime);

  var be;

  if (magnitudeBToEPrime === 0) {
    ab
  }
  else {
    be = multiplyPairBySingleValue(bePrime, p/magnitudeBToEPrime);
  }

  var e = addPairs(b, be);

  var eb = multiplyPairBySingleValue(be, -1);
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

function subtractPairs(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function multiplyPairBySingleValue(pair, single) {
  return [pair[0] * single, pair[1] * single];
}

module.exports = widenBend;
