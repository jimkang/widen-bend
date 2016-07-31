widen-bend
==================

Given three points, a, b, and c, and a length p, finds two points that are length p away from b that sit on the bisecting line of the angle between lines ab and bc.

Basically:

![Problem sketch](meta/problem.jpg)

Installation
------------

    npm install widen-bend

Usage
-----

    var widenBend = require('widen-bend');
    console.log(widenBend({
      start: [30, 50],
      elbow: [0, 20],
      end: [20, 0],
      widenDistance: 20
    }));

Output:

    [
      [-20, 20],
      [20, 20]
    ]

A graph of the bend with the resulting widen points:

![Example graph](https://https://raw.githubusercontent.com/jimkang/widen-bend/master/meta/example-case.png)

Tests
-----

Run tests with `make test`.

Tests and tools require Node 6. Module itself should work in all versions of Node and modern browsers.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
