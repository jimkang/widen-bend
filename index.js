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

  console.log(ab, bc);
  var magnitudeAB = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1]);
  console.log(magnitudeAB);
  var magnitudeBC = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1]);
  console.log(magnitudeBC);

  var magnitudeRatioABToBC = magnitudeAB/magnitudeBC;
  console.log(magnitudeRatioABToBC);
  var normalizedBC = bc.map(normalizePointToAB);
  console.log(normalizedBC);
  var cPrime = [b[0] + normalizedBC[0], b[1] + normalizedBC[1]];
  console.log(cPrime);

  var acPrime = [cPrime[0] - a[0], cPrime[1] - a[1]];
  console.log(acPrime);

  var ePrime = [a[0] + acPrime[0]/2, a[1] + acPrime[1]/2];
  console.log(ePrime);

  var magnitudeBToEPrime = getVectorMagnitude(
    [ePrime[0] - b[0], ePrime[1] - ePrime[0]]
  );
  console.log(magnitudeBToEPrime);

  var e = [ePrime[0]/magnitudeBToEPrime * p, ePrime[1]/magnitudeBToEPrime * p];
  console.log(e);

  // TODO: Check e, get d.
  // Update approach.jpg.

  function normalizePointToAB(point) {
    return point * magnitudeRatioABToBC;
  }

}

function getVectorMagnitude(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

module.exports = widenBend;
