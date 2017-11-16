(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HaikuChecker = exports.HaikuChecker = function () {
  function HaikuChecker(lineOne, lineTwo, lineThree) {
    _classCallCheck(this, HaikuChecker);

    this.lineOne = lineOne;
    this.lineTwo = lineTwo;
    this.lineThree = lineThree;
  }

  _createClass(HaikuChecker, [{
    key: "CheckLines",
    value: function CheckLines() {
      //Checking if Haiku has three lines
      var IsHaiku = false;

      if (this.lineOne !== "" && this.lineTwo !== "" && this.lineThree !== "") {
        IsHaiku = true;
      }
      return IsHaiku;
    }
  }, {
    key: "CheckSyllables",
    value: function CheckSyllables() {
      //Checking if Line 1 has 5 syllables, line 2 has 7 and line 3 has 5 syllables

      var syllable = require('syllable');
      var IsHaiku = false;
      var lineOne = this.lineOne;
      var lineTwo = this.lineTwo;
      var lineThree = this.lineThree;
      var lineOneSyllable = syllable(lineOne);
      var lineTwoSyllable = syllable(lineTwo);
      var lineThreeSyllable = syllable(lineThree);

      console.log(syllable(lineOne));
      console.log(lineOne);
      console.log(lineOneSyllable);
      console.log(syllable(lineTwo));
      console.log(lineTwo);
      console.log(lineTwoSyllable);
      console.log(syllable(lineThree));
      console.log(lineThree);
      console.log(lineThreeSyllable);

      if (lineOneSyllable == 5 && lineTwoSyllable == 7 && lineThreeSyllable == 5) {
        IsHaiku = true;
      }
      return IsHaiku;
    }
  }]);

  return HaikuChecker;
}();

},{"syllable":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HaikuGenerator = exports.HaikuGenerator = function () {
  function HaikuGenerator() {
    _classCallCheck(this, HaikuGenerator);
  }

  _createClass(HaikuGenerator, [{
    key: 'GenerateIP',
    value: function GenerateIP() {
      //Generate a random IP address
      var randomip = require('random-ip');
      var ipAddress = randomip('34.255.23.0', 2);

      return ipAddress;
    }
  }, {
    key: 'DecodeIP',
    value: function DecodeIP(ipAddress) {
      //Decodes IP Address into Haiku
      var hipku = require('hipku');
      var thisipAddress = ipAddress;
      var newHaiku = hipku.encode(thisipAddress);

      return newHaiku;
    }

    // DisplayHaiku(newHaiku) {
    //
    //   let newHaiku = syllable()
    // }

  }]);

  return HaikuGenerator;
}();

},{"hipku":5,"random-ip":12}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],4:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":3,"ieee754":6}],5:[function(require,module,exports){
/*
** Hipku version 0.0.2
** Copyright (c) Gabriel Martin 2014
** All rights reserved
** Available under the MIT license
** http://gabrielmartin.net/projects/hipku
*/
;
var Hipku = (function() {
/*
** ##############
** Public Methods
** ##############
*/

/*
** Object holds all public methods and is returned by the module
*/
var publicMethods = {};

/*
** Public method to encode IP Addresses as haiku
*/
var encode = function(ip) {
  var ipv6, decimalOctetArray, factoredOctetArray, encodedWordArray,
    haikuText;

  ipv6 = ipIsIpv6(ip);
  decimalOctetArray = splitIp(ip, ipv6);
  factoredOctetArray = factorOctets(decimalOctetArray, ipv6);
  encodedWordArray = encodeWords(factoredOctetArray, ipv6);
  haikuText = writeHaiku(encodedWordArray, ipv6);

  return haikuText;
};

/*
** Public method to decode haiku into IP Addresses
*/
var decode = function(haiku) {
  var wordArray, ipv6, factorArray, octetArray, ipString;

  wordArray = splitHaiku(haiku);
  ipv6 = haikuIsIpv6(wordArray);
  factorArray = getFactors(wordArray, ipv6);
  octetArray = getOctets(factorArray, ipv6);
  ipString = getIpString(octetArray, ipv6);

  return ipString;
};

/*
** Attach the public methods to the return object
*/
publicMethods.encode = encode;
publicMethods.decode = decode;

/*
** #############################
** Helper functions for encoding
** #############################
*/

function ipIsIpv6(ip) {
  if (ip.indexOf(':') != -1) { return true; }
  else if (ip.indexOf('.') != -1) { return false; }
  else {
    throw new Error('Formatting error in IP Address input.' +
      ' ' + 'Contains neither ":" or "."');
  }
}

function splitIp(ip, ipv6) {
  var octetArray, separator, v6Base, numOctets, decimalOctetArray;

  octetArray = [];
  decimalOctetArray = [];
  v6Base = 16;

  if (ipv6) {
    separator = ':';
    numOctets = 8;
  } else {
    separator = '.';
    numOctets = 4;
  }

  /*
  ** Remove newline and space characters
  */
  ip = ip.replace(/[\n\ ]/g, '');
  octetArray = ip.split(separator);

  /*
  ** If IPv6 address is in abbreviated format, we need to replace missing octets with 0
  */
  if (octetArray.length < numOctets) {
    if (ipv6) {
      var numMissingOctets = (numOctets - octetArray.length);

      octetArray = padOctets(octetArray, numMissingOctets);
    } else {
      throw new Error('Formatting error in IP Address input.' +
      ' ' + 'IPv4 address has fewer than 4 octets.');
    }
  }

  /*
  ** Conter IPv6 addresses from hex to decimal
  */
  if (ipv6) {
    for (var i = 0; i < octetArray.length; i++) {
      decimalOctetArray[i] = parseInt(octetArray[i], v6Base);
    }
  } else {
    decimalOctetArray = octetArray;
  }
  //array of numbers
  return decimalOctetArray;
}

/*
** If IPv6 is abbreviated, pad with appropriate number of 0 octets
*/
function padOctets(octetArray, numMissingOctets) {
  var paddedOctet, aLength;

  paddedOctet = 0;
  aLength = octetArray.length;

  /*
  ** If the first or last octets are blank, zero them
  */
  if (octetArray[0] === '') {
    octetArray[0] = paddedOctet;
  }
  if (octetArray[aLength - 1] === '') {
    octetArray[aLength - 1] = paddedOctet;
  }

  /*
  ** Check the rest of the array for blank octets and pad as needed
  */
  for (var i = 0; i < aLength; i++) {
    if (octetArray[i] === '') {
      octetArray[i] = paddedOctet;

      for (var j = 0; j < numMissingOctets; j++) {
        octetArray.splice(i, 0, paddedOctet);
      }
    }
  }

  return octetArray;
}

/*
** Convert each decimal octet into a factor of the divisor (16 or 256)
** and a remainder
*/
function factorOctets(octetArray, ipv6) {
  var divisor, factoredOctetArray;

  factoredOctetArray = [];

  if (ipv6) {
    divisor = 256;
  } else {
    divisor = 16;
  }

  for (var i = 0; i < octetArray.length; i++) {
    var octetValue, factor1, factor2;

    octetValue = octetArray[i];

    factor1 = octetArray[i] % divisor;
    octetValue = octetValue - factor1;
    factor2 = octetValue / divisor;

    factoredOctetArray.push(factor2);
    factoredOctetArray.push(factor1);
  }

  return factoredOctetArray;
}

function encodeWords(factorArray, ipv6) {
  var key, encodedWordArray;

  encodedWordArray = [];
  key = getKey(ipv6);

  for (var i = 0; i < factorArray.length; i++) {
    var dict;

    dict = key[i];
    encodedWordArray[i] = dict[factorArray[i]];
  }

  return encodedWordArray;
}


/*
** Return an array of dictionaries representing the correct word
** order for the haiku
*/
function getKey(ipv6) {
  var key;

  if (ipv6) {
    key = [ adjectives,
      nouns,
      adjectives,
      nouns,
      verbs,
      adjectives,
      adjectives,
      adjectives,
      adjectives,
      adjectives,
      nouns,
      adjectives,
      nouns,
      verbs,
      adjectives,
      nouns ];
  } else {
    key = [ animalAdjectives,
      animalColors,
      animalNouns,
      animalVerbs,
      natureAdjectives,
      natureNouns,
      plantNouns,
      plantVerbs ];
  }

  return key;
}

function writeHaiku(wordArray, ipv6) {
  var octet, schemaResults, schema, nonWords, haiku;

  octet = 'OCTET'; // String to place in schema to show word slots
  schemaResults = getSchema(ipv6, octet);
  schema = schemaResults[0];
  nonWords = schemaResults[1];

  /*
  ** Replace each instance of 'octet' in the schema with a word from
  ** the encoded word array
  */
  for (var i = 0; i < wordArray.length; i++) {
    for (var j = 0; j < schema.length; j++) {
      if (schema[j] === octet) {
        schema[j] = wordArray[i];
        break;
      }
    }
  }

  /*
  ** Capitalize appropriate words
  */
  schema = capitalizeHaiku(schema);
  haiku = schema.join('');

  return haiku;
}

function getSchema(ipv6, octet) {
  var schema, newLine, period, space, nonWords;

  schema = [];
  newLine = '\n';
  period = '.';
  space = ' ';
  nonWords = [newLine, period, space];

  if (ipv6) {
      schema = [octet,
      octet,
      'and',
      octet,
      octet,
      newLine,
      octet,
      octet,
      octet,
      octet,
      octet,
      octet,
      octet,
      period,
      newLine,
      octet,
      octet,
      octet,
      octet,
      octet,
      period,
      newLine];
  } else {
      schema = ['The',
      octet,
      octet,
      octet,
      newLine,
      octet,
      'in the',
      octet,
      octet,
      period,
      newLine,
      octet,
      octet,
      period,
      newLine];
  }

  /*
  ** Add spaces before words except the first word
  */
  for (var i = 1; i < schema.length; i++) {
      var insertSpace = true;

      /*
      ** If the next entry is a nonWord, don't add a space
      */
      for (var j = 0; j < nonWords.length; j++) {
        if (schema[i] === nonWords[j]) {
            insertSpace = false;
        }
      }

      /*
      ** If the previous entry is a newLine, don't add a space
      */
      if (schema[i - 1] === newLine) {
          insertSpace = false;
      }

      if (insertSpace) {
          schema.splice(i, 0, space);
          i = i + 1;
      }
  }

  return [schema, nonWords];
}

function capitalizeHaiku(haikuArray) {
  var period = '.';

  /*
  ** Always capitalize the first word
  */
  haikuArray[0] = capitalizeWord(haikuArray[0]);

  for (var i = 1; i < haikuArray.length; i++) {

    if (haikuArray[i] === period && i + 2 < haikuArray.length) {
      /*
      ** If the current entry is a period then the next entry will be
      ** a newLine or a space, so check two positions ahead and
      ** capitalize that entry, so long as it's a word
      */
      haikuArray[i + 2] = capitalizeWord(haikuArray[i + 2]);
    }
  }

  return haikuArray;
}

function capitalizeWord(word) {
  word = word.substring(0,1).toUpperCase() +
    word.substring(1, word.length);

  return word;
}

/*
** #############################
** Helper functions for decoding
** #############################
*/

function splitHaiku(haiku) {
  var wordArray;

  haiku = haiku.toLowerCase();

  /*
  ** Replace newline characters with spaces
  */
  haiku = haiku.replace(/\n/g, ' ');

  /*
  ** Remove anything that's not a letter, a space or a dash
  */
  haiku = haiku.replace(/[^a-z\ -]/g, '');
  wordArray = haiku.split(' ');

  /*
  ** Remove any blank entries
  */
  for (var i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === '') {
      wordArray.splice(i, 1);
    }
  }

  return wordArray;
}

function haikuIsIpv6(wordArray) {
  var ipv6, key, dict;

  key = getKey(false);
  dict = key[0];
  ipv6 = true;

  /*
  ** Compare each word in the haiku against each word in the first
  ** dictionary defined in the IPv4 key. If there's a match, the
  ** current haiku is IPv4. If not, IPv6.
  */
  for (var i = 0; i < wordArray.length; i++) {
    var currentWord = wordArray[i];

    for (var j = 0; j < dict.length; j++) {
      if (currentWord === dict[j]) {
          ipv6 = false;
          break;
      }
    }

    if (ipv6 === false) {
      break;
    }
  }

  return ipv6;
}

/*
** Return an array of factors and remainders for each encoded
** octet-value
*/
function getFactors(wordArray, ipv6) {
  var key, factorArray, wordArrayPosition;

  key = getKey(ipv6);
  factorArray = [];
  wordArrayPosition = 0;

  /*
  ** Get the first dictionary from the key. Check the first entry in
  ** the encoded word array to see if it's in that dictionary. If it
  ** is, store the dictionary offset and move onto the next dictionary
  ** and the next word in the encoded words array. If there isn't a
  ** match, keep the same dictionary but check the next word in the
  ** array. Keep going till we have an offset for each dictionary in
  ** the key.
  */
  for (var i = 0; i < key.length; i++) {
    var result, factor, newPosition;

    result = [];
    result = getFactorFromWord(key[i], key.length,
                wordArray, wordArrayPosition);
    factor = result[0];
    newPosition = result[1];
    wordArrayPosition = newPosition;

    factorArray.push(factor);
  }

  return factorArray;
}

function getFactorFromWord(dict, maxLength, words, position) {
  var factor = null;

  for (var j = 0; j < dict.length; j++) {
    var dictEntryLength, wordToCheck;

    /*
    ** Get the number of words in the dictionary entry
    */
    dictEntryLength = dict[j].split(' ').length;

    /*
    ** build a string to compare against the dictionary entry
    ** by joining the appropriate number of wordArray entries
    */
    wordToCheck =
      words.slice(position, position + dictEntryLength);
    wordToCheck = wordToCheck.join(' ');

    if (dict[j] === wordToCheck) {
      factor = j;

      /*
      ** If the dictionary entry word count is greater than one,
      ** increment the position counter by the difference to
      ** avoid rechecking words we've already checkced
      */
      position = position + (dictEntryLength - 1);
      break;
    }
  }

  position = position + 1;

  if (factor === null) {
    if (position >= maxLength) {
      /*
      ** We've reached the entry of the haiku and still not matched
      ** all necessary dictionaries, so throw an error
      */
      throw new Error('Decoding error: one or more dictionary words' +
                       'missing from input haiku');
    } else {
      /*
      ** Couldn't find the current word in the current dictionary,
      ** try the next word
      */
      return getFactorFromWord(dict, maxLength, words, position);
    }
  } else {
    /*
    ** Found the word - return the dictionary offset and the new
    ** word array position
    */
    return [factor, position];
  }
}

function getOctets(factorArray, ipv6) {
  var octetArray, multiplier;

  octetArray = [];
  if (ipv6) {
    multiplier = 256;
  } else {
    multiplier = 16;
  }

  for (var i = 0; i < factorArray.length; i = i + 2) {
    var factor1, factor2, octet;

    factor1 = factorArray[i];
    factor2 = factorArray[i + 1];
    octet = (factor1 * multiplier) + factor2;

    if (ipv6) {
      octet = octet.toString(16);
    }

    octetArray.push(octet);
  }

  return octetArray;
}

function getIpString(octetArray, ipv6) {
  var ipString, separator;

  ipString = '';

  if (ipv6) {
    separator = ':';
  } else {
    separator = '.';
  }

  for (var i = 0; i < octetArray.length; i++) {
    if (i > 0) {
      ipString += separator;
    }
    ipString += octetArray[i];
  }

  return ipString;
}

/*
** ############
** Dictionaries
** ############
*/

var adjectives, nouns, verbs, animalAdjectives, animalColors,
animalNouns, animalVerbs, natureAdjectives, natureNouns,
plantNouns, plantVerbs;

/*
** IPv4 dictionaries
*/

animalAdjectives = ['agile',
  'bashful',
  'clever',
  'clumsy',
  'drowsy',
  'fearful',
  'graceful',
  'hungry',
  'lonely',
  'morose',
  'placid',
  'ruthless',
  'silent',
  'thoughtful',
  'vapid',
  'weary'];

animalColors = ['beige',
  'black',
  'blue',
  'bright',
  'bronze',
  'brown',
  'dark',
  'drab',
  'green',
  'gold',
  'grey',
  'jade',
  'pale',
  'pink',
  'red',
  'white'];

animalNouns = ['ape',
  'bear',
  'crow',
  'dove',
  'frog',
  'goat',
  'hawk',
  'lamb',
  'mouse',
  'newt',
  'owl',
  'pig',
  'rat',
  'snake',
  'toad',
  'wolf'];

animalVerbs = ['aches',
  'basks',
  'cries',
  'dives',
  'eats',
  'fights',
  'groans',
  'hunts',
  'jumps',
  'lies',
  'prowls',
  'runs',
  'sleeps',
  'thrives',
  'wakes',
  'yawns'];

natureAdjectives = ['ancient',
  'barren',
  'blazing',
  'crowded',
  'distant',
  'empty',
  'foggy',
  'fragrant',
  'frozen',
  'moonlit',
  'peaceful',
  'quiet',
  'rugged',
  'serene',
  'sunlit',
  'wind-swept'];

natureNouns = ['canyon',
  'clearing',
  'desert',
  'foothills',
  'forest',
  'grasslands',
  'jungle',
  'meadow',
  'mountains',
  'prairie',
  'river',
  'rockpool',
  'sand-dune',
  'tundra',
  'valley',
  'wetlands'];

plantNouns = ['autumn colors',
  'cherry blossoms',
  'chrysanthemums',
  'crabapple blooms',
  'the dry palm fronds',
  'fat horse chestnuts',
  'forget-me-nots',
  'jasmine petals',
  'lotus flowers',
  'ripe blackberries',
  'the maple seeds',
  'the pine needles',
  'tiger lillies',
  'water lillies',
  'willow branches',
  'yellowwood leaves'];

plantVerbs = ['blow',
  'crunch',
  'dance',
  'drift',
  'drop',
  'fall',
  'grow',
  'pile',
  'rest',
  'roll',
  'show',
  'spin',
  'stir',
  'sway',
  'turn',
  'twist'];

/*
** IPv6 dictionaries
*/

adjectives = ['ace',
  'apt',
  'arched',
  'ash',
  'bad',
  'bare',
  'beige',
  'big',
  'black',
  'bland',
  'bleak',
  'blond',
  'blue',
  'blunt',
  'blush',
  'bold',
  'bone',
  'both',
  'bound',
  'brash',
  'brass',
  'brave',
  'brief',
  'brisk',
  'broad',
  'bronze',
  'brushed',
  'burned',
  'calm',
  'ceil',
  'chaste',
  'cheap',
  'chilled',
  'clean',
  'coarse',
  'cold',
  'cool',
  'corn',
  'crass',
  'crazed',
  'cream',
  'crisp',
  'crude',
  'cruel',
  'cursed',
  'cute',
  'daft',
  'damp',
  'dark',
  'dead',
  'deaf',
  'dear',
  'deep',
  'dense',
  'dim',
  'drab',
  'dry',
  'dull',
  'faint',
  'fair',
  'fake',
  'false',
  'famed',
  'far',
  'fast',
  'fat',
  'fierce',
  'fine',
  'firm',
  'flat',
  'flawed',
  'fond',
  'foul',
  'frail',
  'free',
  'fresh',
  'full',
  'fun',
  'glum',
  'good',
  'grave',
  'gray',
  'great',
  'green',
  'grey',
  'grim',
  'gruff',
  'hard',
  'harsh',
  'high',
  'hoarse',
  'hot',
  'huge',
  'hurt',
  'ill',
  'jade',
  'jet',
  'jinxed',
  'keen',
  'kind',
  'lame',
  'lank',
  'large',
  'last',
  'late',
  'lean',
  'lewd',
  'light',
  'limp',
  'live',
  'loath',
  'lone',
  'long',
  'loose',
  'lost',
  'louche',
  'loud',
  'low',
  'lush',
  'mad',
  'male',
  'masked',
  'mean',
  'meek',
  'mild',
  'mint',
  'moist',
  'mute',
  'near',
  'neat',
  'new',
  'nice',
  'nude',
  'numb',
  'odd',
  'old',
  'pained',
  'pale',
  'peach',
  'pear',
  'peeved',
  'pink',
  'piqued',
  'plain',
  'plum',
  'plump',
  'plush',
  'poor',
  'posed',
  'posh',
  'prim',
  'prime',
  'prompt',
  'prone',
  'proud',
  'prune',
  'puce',
  'pure',
  'quaint',
  'quartz',
  'quick',
  'rare',
  'raw',
  'real',
  'red',
  'rich',
  'ripe',
  'rough',
  'rude',
  'rushed',
  'rust',
  'sad',
  'safe',
  'sage',
  'sane',
  'scorched',
  'shaped',
  'sharp',
  'sheared',
  'short',
  'shrewd',
  'shrill',
  'shrunk',
  'shy',
  'sick',
  'skilled',
  'slain',
  'slick',
  'slight',
  'slim',
  'slow',
  'small',
  'smart',
  'smooth',
  'smug',
  'snide',
  'snug',
  'soft',
  'sore',
  'sought',
  'sour',
  'spare',
  'sparse',
  'spent',
  'spoilt',
  'spry',
  'squat',
  'staid',
  'stale',
  'stark',
  'staunch',
  'steep',
  'stiff',
  'strange',
  'straw',
  'stretched',
  'strict',
  'striped',
  'strong',
  'suave',
  'sure',
  'svelte',
  'swank',
  'sweet',
  'swift',
  'tall',
  'tame',
  'tan',
  'tart',
  'taut',
  'teal',
  'terse',
  'thick',
  'thin',
  'tight',
  'tiny',
  'tired',
  'toothed',
  'torn',
  'tough',
  'trim',
  'trussed',
  'twin',
  'used',
  'vague',
  'vain',
  'vast',
  'veiled',
  'vexed',
  'vile',
  'warm',
  'weak',
  'webbed',
  'wrong',
  'wry',
  'young'];

nouns = ['ants',
  'apes',
  'asps',
  'balls',
  'barb',
  'barbs',
  'bass',
  'bats',
  'beads',
  'beaks',
  'bears',
  'bees',
  'bells',
  'belts',
  'birds',
  'blades',
  'blobs',
  'blooms',
  'boars',
  'boats',
  'bolts',
  'books',
  'bowls',
  'boys',
  'bream',
  'brides',
  'broods',
  'brooms',
  'brutes',
  'bucks',
  'bulbs',
  'bulls',
  'burls',
  'cakes',
  'calves',
  'capes',
  'cats',
  'char',
  'chests',
  'choirs',
  'clams',
  'clans',
  'clouds',
  'clowns',
  'cod',
  'coins',
  'colts',
  'cones',
  'cords',
  'cows',
  'crabs',
  'cranes',
  'crows',
  'cults',
  'czars',
  'darts',
  'dates',
  'deer',
  'dholes',
  'dice',
  'discs',
  'does',
  'dogs',
  'doors',
  'dopes',
  'doves',
  'drakes',
  'dreams',
  'drones',
  'ducks',
  'dunes',
  'eels',
  'eggs',
  'elk',
  'elks',
  'elms',
  'elves',
  'ewes',
  'eyes',
  'faces',
  'facts',
  'fawns',
  'feet',
  'ferns',
  'fish',
  'fists',
  'flames',
  'fleas',
  'flocks',
  'flutes',
  'foals',
  'foes',
  'fools',
  'fowl',
  'frogs',
  'fruits',
  'gangs',
  'gar',
  'geese',
  'gems',
  'germs',
  'ghosts',
  'gnomes',
  'goats',
  'grapes',
  'grooms',
  'grouse',
  'grubs',
  'guards',
  'gulls',
  'hands',
  'hares',
  'hawks',
  'heads',
  'hearts',
  'hens',
  'herbs',
  'hills',
  'hogs',
  'holes',
  'hordes',
  'ide',
  'jars',
  'jays',
  'kids',
  'kings',
  'kites',
  'lads',
  'lakes',
  'lambs',
  'larks',
  'lice',
  'lights',
  'limbs',
  'looms',
  'loons',
  'mares',
  'masks',
  'mice',
  'mimes',
  'minks',
  'mists',
  'mites',
  'mobs',
  'molds',
  'moles',
  'moons',
  'moths',
  'newts',
  'nymphs',
  'orbs',
  'orcs',
  'owls',
  'pearls',
  'pears',
  'peas',
  'perch',
  'pigs',
  'pikes',
  'pines',
  'plains',
  'plants',
  'plums',
  'pools',
  'prawns',
  'prunes',
  'pugs',
  'punks',
  'quail',
  'quails',
  'queens',
  'quills',
  'rafts',
  'rains',
  'rams',
  'rats',
  'rays',
  'ribs',
  'rocks',
  'rooks',
  'ruffs',
  'runes',
  'sands',
  'seals',
  'seas',
  'seeds',
  'serfs',
  'shards',
  'sharks',
  'sheep',
  'shells',
  'ships',
  'shoals',
  'shrews',
  'shrimp',
  'skate',
  'skies',
  'skunks',
  'sloths',
  'slugs',
  'smew',
  'smiles',
  'snails',
  'snakes',
  'snipes',
  'sole',
  'songs',
  'spades',
  'sprats',
  'sprouts',
  'squabs',
  'squads',
  'squares',
  'squid',
  'stars',
  'stoats',
  'stones',
  'storks',
  'strays',
  'suns',
  'swans',
  'swarms',
  'swells',
  'swifts',
  'tars',
  'teams',
  'teeth',
  'terns',
  'thorns',
  'threads',
  'thrones',
  'ticks',
  'toads',
  'tools',
  'trees',
  'tribes',
  'trolls',
  'trout',
  'tunes',
  'tusks',
  'veins',
  'verbs',
  'vines',
  'voles',
  'wasps',
  'waves',
  'wells',
  'whales',
  'whelks',
  'whiffs',
  'winds',
  'wolves',
  'worms',
  'wraiths',
  'wrens',
  'yaks'];

verbs = ['aid',
  'arm',
  'awe',
  'axe',
  'bag',
  'bait',
  'bare',
  'bash',
  'bathe',
  'beat',
  'bid',
  'bilk',
  'blame',
  'bleach',
  'bleed',
  'bless',
  'bluff',
  'blur',
  'boast',
  'boost',
  'boot',
  'bore',
  'botch',
  'breed',
  'brew',
  'bribe',
  'brief',
  'brine',
  'broil',
  'browse',
  'bruise',
  'build',
  'burn',
  'burst',
  'call',
  'calm',
  'carve',
  'chafe',
  'chant',
  'charge',
  'chart',
  'cheat',
  'check',
  'cheer',
  'chill',
  'choke',
  'chomp',
  'choose',
  'churn',
  'cite',
  'clamp',
  'clap',
  'clasp',
  'claw',
  'clean',
  'cleanse',
  'clip',
  'cloak',
  'clone',
  'clutch',
  'coax',
  'crack',
  'crave',
  'crunch',
  'cry',
  'cull',
  'cure',
  'curse',
  'cuss',
  'dare',
  'daze',
  'dent',
  'dig',
  'ding',
  'doubt',
  'dowse',
  'drag',
  'drain',
  'drape',
  'draw',
  'dread',
  'dredge',
  'drill',
  'drink',
  'drip',
  'drive',
  'drop',
  'drown',
  'dry',
  'dump',
  'eat',
  'etch',
  'face',
  'fail',
  'fault',
  'fear',
  'feed',
  'feel',
  'fetch',
  'fight',
  'find',
  'fix',
  'flap',
  'flay',
  'flee',
  'fling',
  'flip',
  'float',
  'foil',
  'forge',
  'free',
  'freeze',
  'frisk',
  'gain',
  'glimpse',
  'gnaw',
  'goad',
  'gouge',
  'grab',
  'grasp',
  'graze',
  'grieve',
  'grip',
  'groom',
  'guard',
  'guards',
  'guide',
  'gulp',
  'gush',
  'halt',
  'harm',
  'hate',
  'haul',
  'haunt',
  'have',
  'heal',
  'hear',
  'help',
  'herd',
  'hex',
  'hire',
  'hit',
  'hoist',
  'hound',
  'hug',
  'hurl',
  'irk',
  'jab',
  'jeer',
  'join',
  'jolt',
  'keep',
  'kick',
  'kill',
  'kiss',
  'lash',
  'leash',
  'leave',
  'lift',
  'like',
  'love',
  'lug',
  'lure',
  'maim',
  'make',
  'mask',
  'meet',
  'melt',
  'mend',
  'miss',
  'mould',
  'move',
  'nab',
  'name',
  'need',
  'oust',
  'paint',
  'paw',
  'pay',
  'peck',
  'peeve',
  'pelt',
  'please',
  'pluck',
  'poach',
  'poll',
  'praise',
  'prick',
  'print',
  'probe',
  'prod',
  'prompt',
  'punch',
  'quash',
  'quell',
  'quote',
  'raid',
  'raise',
  'raze',
  'ride',
  'roast',
  'rouse',
  'rule',
  'scald',
  'scalp',
  'scar',
  'scathe',
  'score',
  'scorn',
  'scour',
  'scuff',
  'sear',
  'see',
  'seek',
  'seize',
  'send',
  'sense',
  'serve',
  'shake',
  'shear',
  'shift',
  'shoot',
  'shun',
  'slap',
  'slay',
  'slice',
  'smack',
  'smash',
  'smell',
  'smite',
  'snare',
  'snatch',
  'sniff',
  'snub',
  'soak',
  'spare',
  'splash',
  'split',
  'spook',
  'spray',
  'squash',
  'squeeze',
  'stab',
  'stain',
  'starve',
  'steal',
  'steer',
  'sting',
  'strike',
  'stun',
  'tag',
  'tame',
  'taste',
  'taunt',
  'teach',
  'tend'];

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = publicMethods;
} else {
  return publicMethods;
}

})();

},{}],6:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],7:[function(require,module,exports){
var ip = exports,
    Buffer = require('buffer').Buffer,
    os = require('os');

ip.toBuffer = function toBuffer(ip, buff, offset) {
  offset = ~~offset;

  var result;

  if (/^(\d{1,3}\.){3,3}\d{1,3}$/.test(ip)) {
    result = buff || new Buffer(offset + 4);
    ip.split(/\./g).map(function(byte) {
      result[offset++] = parseInt(byte, 10) & 0xff;
    });
  } else if (/^[a-f0-9:]+$/.test(ip)) {
    var s = ip.split(/::/g, 2),
        head = (s[0] || '').split(/:/g, 8),
        tail = (s[1] || '').split(/:/g, 8);

    if (tail.length === 0) {
      // xxxx::
      while (head.length < 8) head.push('0000');
    } else if (head.length === 0) {
      // ::xxxx
      while (tail.length < 8) tail.unshift('0000');
    } else {
      // xxxx::xxxx
      while (head.length + tail.length < 8) head.push('0000');
    }

    result = buff || new Buffer(offset + 16);
    head.concat(tail).map(function(word) {
      word = parseInt(word, 16);
      result[offset++] = (word >> 8) & 0xff;
      result[offset++] = word & 0xff;
    });
  } else {
    throw Error('Invalid ip address: ' + ip);
  }

  return result;
};

ip.toString = function toString(buff, offset, length) {
  offset = ~~offset;
  length = length || (buff.length - offset);

  var result = [];
  if (length === 4) {
    // IPv4
    for (var i = 0; i < length; i++) {
      result.push(buff[offset + i]);
    }
    result = result.join('.');
  } else if (length === 16) {
    // IPv6
    for (var i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16));
    }
    result = result.join(':');
    result = result.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
    result = result.replace(/:{3,4}/, '::');
  }

  return result;
};

ip.fromPrefixLen = function fromPrefixLen(prefixlen, family) {
  if (prefixlen > 32) {
    family = 'ipv6';
  } else {
    family = _normalizeFamily(family);
  }

  var len = 4;
  if (family === 'ipv6') {
    len = 16;
  }
  var buff = new Buffer(len);

  for (var i = 0, n = buff.length; i < n; ++i) {
    var bits = 8;
    if (prefixlen < 8) {
      bits = prefixlen;
    }
    prefixlen -= bits;

    buff[i] = ~(0xff >> bits);
  }

  return ip.toString(buff);
};

ip.mask = function mask(addr, mask) {
  addr = ip.toBuffer(addr);
  mask = ip.toBuffer(mask);

  var result = new Buffer(Math.max(addr.length, mask.length));

  // Same protocol - do bitwise and
  if (addr.length === mask.length) {
    for (var i = 0; i < addr.length; i++) {
      result[i] = addr[i] & mask[i];
    }
  } else if (mask.length === 4) {
    // IPv6 address and IPv4 mask
    // (Mask low bits)
    for (var i = 0; i < mask.length; i++) {
      result[i] = addr[addr.length - 4  + i] & mask[i];
    }
  } else {
    // IPv6 mask and IPv4 addr
    for (var i = 0; i < result.length - 6; i++) {
      result[i] = 0;
    }

    // ::ffff:ipv4
    result[10] = 0xff;
    result[11] = 0xff;
    for (var i = 0; i < addr.length; i++) {
      result[i + 12] = addr[i] & mask[i + 12];
    }
  }

  return ip.toString(result);
};

ip.not = function not(addr) {
  var buff = ip.toBuffer(addr);
  for (var i = 0; i < buff.length; i++) {
    buff[i] = 0xff ^ buff[i];
  }
  return ip.toString(buff);
};

ip.or = function or(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // same protocol
  if (a.length == b.length) {
    for (var i = 0; i < a.length; ++i) {
      a[i] |= b[i];
    }
    return ip.toString(a);

  // mixed protocols
  } else {
    var buff = a;
    var other = b;
    if (b.length > a.length) {
      buff = b;
      other = a;
    }

    var offset = buff.length - other.length;
    for (var i = offset; i < buff.length; ++i) {
      buff[i] |= other[i - offset];
    }

    return ip.toString(buff);
  }
};

ip.isEqual = function isEqual(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // Same protocol
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Swap
  if (b.length === 4) {
    var t = b;
    b = a;
    a = t;
  }

  // a - IPv4, b - IPv6
  for (var i = 0; i < 10; i++) {
    if (b[i] !== 0) return false;
  }

  var word = b.readUInt16BE(10);
  if (word !== 0 && word !== 0xffff) return false;

  for (var i = 0; i < 4; i++) {
    if (a[i] !== b[i + 12]) return false;
  }

  return true;
};

ip.isPrivate = function isPrivate(addr) {
  return addr.match(/^10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^192\.168\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^169\.254\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^fc00:/) != null || addr.match(/^fe80:/) != null;
};

ip.isPublic = function isPublic(addr) {
  return !ip.isPrivate(addr);
}

ip.isLoopback = function isLoopback(addr) {
  return /^127\.0\.0\.1/.test(addr)
    || /^fe80::1/.test(addr)
    || /^::1/.test(addr);
};

ip.loopback = function loopback(family) {
  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  if (family !== 'ipv4' && family !== 'ipv6') {
    throw new Error('family must be ipv4 or ipv6');
  }

  return family === 'ipv4'
    ? '127.0.0.1'
    : 'fe80::1';
};

//
// ### function address (name, family)
// #### @name {string|'public'|'private'} **Optional** Name or security
//      of the network interface.
// #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
//      to ipv4).
//
// Returns the address for the network interface on the current system with
// the specified `name`:
//   * String: First `family` address of the interface.
//             If not found see `undefined`.
//   * 'public': the first public ip address of family.
//   * 'private': the first private ip address of family.
//   * undefined: First address with `ipv4` or loopback addres `127.0.0.1`.
//
ip.address = function address(name, family) {
  var interfaces = os.networkInterfaces(),
      all;

  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  //
  // If a specific network interface has been named,
  // return the address.
  //
  if (name && !~['public', 'private'].indexOf(name)) {
    return interfaces[name].filter(function (details) {
      details.family = details.family.toLowerCase();
      return details.family === family;
    })[0].address;
  }

  var all = Object.keys(interfaces).map(function (nic) {
    //
    // Note: name will only be `public` or `private`
    // when this is called.
    //
    var addresses = interfaces[nic].filter(function (details) {
      details.family = details.family.toLowerCase();
      if (details.family !== family || ip.isLoopback(details.address)) {
        return false;
      }
      else if (!name) {
        return true;
      }

      return name === 'public'
        ? !ip.isPrivate(details.address)
        : ip.isPrivate(details.address)
    });

    return addresses.length
      ? addresses[0].address
      : undefined;
  }).filter(Boolean);

  return !all.length
    ? ip.loopback(family)
    : all[0];
};

ip.toLong = function toInt(ip){
  var ipl=0;
  ip.split('.').forEach(function( octet ) {
      ipl<<=8;
      ipl+=parseInt(octet);
  });
  return(ipl >>>0);
};

ip.fromLong = function fromInt(ipl){
  return ( (ipl>>>24) +'.' +
      (ipl>>16 & 255) +'.' +
      (ipl>>8 & 255) +'.' +
      (ipl & 255) );
};

function _normalizeFamily(family) {
  return family ? family.toLowerCase() : 'ipv4';
}

},{"buffer":4,"os":10}],8:[function(require,module,exports){
module.exports={"105":"i","192":"A","193":"A","194":"A","195":"A","196":"A","197":"A","199":"C","200":"E","201":"E","202":"E","203":"E","204":"I","205":"I","206":"I","207":"I","209":"N","210":"O","211":"O","212":"O","213":"O","214":"O","216":"O","217":"U","218":"U","219":"U","220":"U","221":"Y","224":"a","225":"a","226":"a","227":"a","228":"a","229":"a","231":"c","232":"e","233":"e","234":"e","235":"e","236":"i","237":"i","238":"i","239":"i","241":"n","242":"o","243":"o","244":"o","245":"o","246":"o","248":"o","249":"u","250":"u","251":"u","252":"u","253":"y","255":"y","256":"A","257":"a","258":"A","259":"a","260":"A","261":"a","262":"C","263":"c","264":"C","265":"c","266":"C","267":"c","268":"C","269":"c","270":"D","271":"d","272":"D","273":"d","274":"E","275":"e","276":"E","277":"e","278":"E","279":"e","280":"E","281":"e","282":"E","283":"e","284":"G","285":"g","286":"G","287":"g","288":"G","289":"g","290":"G","291":"g","292":"H","293":"h","294":"H","295":"h","296":"I","297":"i","298":"I","299":"i","300":"I","301":"i","302":"I","303":"i","304":"I","308":"J","309":"j","310":"K","311":"k","313":"L","314":"l","315":"L","316":"l","317":"L","318":"l","319":"L","320":"l","321":"L","322":"l","323":"N","324":"n","325":"N","326":"n","327":"N","328":"n","332":"O","333":"o","334":"O","335":"o","336":"O","337":"o","338":"O","339":"o","340":"R","341":"r","342":"R","343":"r","344":"R","345":"r","346":"S","347":"s","348":"S","349":"s","350":"S","351":"s","352":"S","353":"s","354":"T","355":"t","356":"T","357":"t","358":"T","359":"t","360":"U","361":"u","362":"U","363":"u","364":"U","365":"u","366":"U","367":"u","368":"U","369":"u","370":"U","371":"u","372":"W","373":"w","374":"Y","375":"y","376":"Y","377":"Z","378":"z","379":"Z","380":"z","381":"Z","382":"z","384":"b","385":"B","386":"B","387":"b","390":"O","391":"C","392":"c","393":"D","394":"D","395":"D","396":"d","398":"E","400":"E","401":"F","402":"f","403":"G","407":"I","408":"K","409":"k","410":"l","412":"M","413":"N","414":"n","415":"O","416":"O","417":"o","420":"P","421":"p","422":"R","427":"t","428":"T","429":"t","430":"T","431":"U","432":"u","434":"V","435":"Y","436":"y","437":"Z","438":"z","461":"A","462":"a","463":"I","464":"i","465":"O","466":"o","467":"U","468":"u","477":"e","484":"G","485":"g","486":"G","487":"g","488":"K","489":"k","490":"O","491":"o","500":"G","501":"g","504":"N","505":"n","512":"A","513":"a","514":"A","515":"a","516":"E","517":"e","518":"E","519":"e","520":"I","521":"i","522":"I","523":"i","524":"O","525":"o","526":"O","527":"o","528":"R","529":"r","530":"R","531":"r","532":"U","533":"u","534":"U","535":"u","536":"S","537":"s","538":"T","539":"t","542":"H","543":"h","544":"N","545":"d","548":"Z","549":"z","550":"A","551":"a","552":"E","553":"e","558":"O","559":"o","562":"Y","563":"y","564":"l","565":"n","566":"t","567":"j","570":"A","571":"C","572":"c","573":"L","574":"T","575":"s","576":"z","579":"B","580":"U","581":"V","582":"E","583":"e","584":"J","585":"j","586":"Q","587":"q","588":"R","589":"r","590":"Y","591":"y","592":"a","593":"a","595":"b","596":"o","597":"c","598":"d","599":"d","600":"e","603":"e","604":"e","605":"e","606":"e","607":"j","608":"g","609":"g","610":"g","613":"h","614":"h","616":"i","618":"i","619":"l","620":"l","621":"l","623":"m","624":"m","625":"m","626":"n","627":"n","628":"n","629":"o","633":"r","634":"r","635":"r","636":"r","637":"r","638":"r","639":"r","640":"r","641":"r","642":"s","647":"t","648":"t","649":"u","651":"v","652":"v","653":"w","654":"y","655":"y","656":"z","657":"z","663":"c","665":"b","666":"e","667":"g","668":"h","669":"j","670":"k","671":"l","672":"q","686":"h","688":"h","690":"j","691":"r","692":"r","694":"r","695":"w","696":"y","737":"l","738":"s","739":"x","780":"v","829":"x","851":"x","867":"a","868":"e","869":"i","870":"o","871":"u","872":"c","873":"d","874":"h","875":"m","876":"r","877":"t","878":"v","879":"x","7424":"a","7427":"b","7428":"c","7429":"d","7431":"e","7432":"e","7433":"i","7434":"j","7435":"k","7436":"l","7437":"m","7438":"n","7439":"o","7440":"o","7441":"o","7442":"o","7443":"o","7446":"o","7447":"o","7448":"p","7449":"r","7450":"r","7451":"t","7452":"u","7453":"u","7454":"u","7455":"m","7456":"v","7457":"w","7458":"z","7522":"i","7523":"r","7524":"u","7525":"v","7680":"A","7681":"a","7682":"B","7683":"b","7684":"B","7685":"b","7686":"B","7687":"b","7690":"D","7691":"d","7692":"D","7693":"d","7694":"D","7695":"d","7696":"D","7697":"d","7698":"D","7699":"d","7704":"E","7705":"e","7706":"E","7707":"e","7710":"F","7711":"f","7712":"G","7713":"g","7714":"H","7715":"h","7716":"H","7717":"h","7718":"H","7719":"h","7720":"H","7721":"h","7722":"H","7723":"h","7724":"I","7725":"i","7728":"K","7729":"k","7730":"K","7731":"k","7732":"K","7733":"k","7734":"L","7735":"l","7738":"L","7739":"l","7740":"L","7741":"l","7742":"M","7743":"m","7744":"M","7745":"m","7746":"M","7747":"m","7748":"N","7749":"n","7750":"N","7751":"n","7752":"N","7753":"n","7754":"N","7755":"n","7764":"P","7765":"p","7766":"P","7767":"p","7768":"R","7769":"r","7770":"R","7771":"r","7774":"R","7775":"r","7776":"S","7777":"s","7778":"S","7779":"s","7786":"T","7787":"t","7788":"T","7789":"t","7790":"T","7791":"t","7792":"T","7793":"t","7794":"U","7795":"u","7796":"U","7797":"u","7798":"U","7799":"u","7804":"V","7805":"v","7806":"V","7807":"v","7808":"W","7809":"w","7810":"W","7811":"w","7812":"W","7813":"w","7814":"W","7815":"w","7816":"W","7817":"w","7818":"X","7819":"x","7820":"X","7821":"x","7822":"Y","7823":"y","7824":"Z","7825":"z","7826":"Z","7827":"z","7828":"Z","7829":"z","7835":"s","7840":"A","7841":"a","7842":"A","7843":"a","7864":"E","7865":"e","7866":"E","7867":"e","7868":"E","7869":"e","7880":"I","7881":"i","7882":"I","7883":"i","7884":"O","7885":"o","7886":"O","7887":"o","7908":"U","7909":"u","7910":"U","7911":"u","7922":"Y","7923":"y","7924":"Y","7925":"y","7926":"Y","7927":"y","7928":"Y","7929":"y","8305":"i","8341":"h","8342":"k","8343":"l","8344":"m","8345":"n","8346":"p","8347":"s","8348":"t","8450":"c","8458":"g","8459":"h","8460":"h","8461":"h","8464":"i","8465":"i","8466":"l","8467":"l","8468":"l","8469":"n","8472":"p","8473":"p","8474":"q","8475":"r","8476":"r","8477":"r","8484":"z","8488":"z","8492":"b","8493":"c","8495":"e","8496":"e","8497":"f","8498":"F","8499":"m","8500":"o","8506":"q","8513":"g","8514":"l","8515":"l","8516":"y","8517":"d","8518":"d","8519":"e","8520":"i","8521":"j","8526":"f","8579":"C","8580":"c","8765":"s","8766":"s","8959":"z","8999":"x","9746":"x","9776":"i","9866":"i","10005":"x","10006":"x","10007":"x","10008":"x","10625":"z","10626":"z","11362":"L","11364":"R","11365":"a","11366":"t","11373":"A","11374":"M","11375":"A","11390":"S","11391":"Z","19904":"i","42893":"H","42922":"H","42923":"E","42924":"G","42925":"L","42928":"K","42929":"T","62937":"x"}
},{}],9:[function(require,module,exports){
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(global, global.document);
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(global, global.document);
  } else {
      global.normalize = factory(global, global.document);
  }
} (typeof window !== 'undefined' ? window : this, function (window, document) {
  var charmap = require('./charmap');
  var regex = null;
  var current_charmap;
  var old_charmap;

  function normalize(str, custom_charmap) {
    old_charmap = current_charmap;
    current_charmap = custom_charmap || charmap;

    regex = (regex && old_charmap === current_charmap) ? regex : buildRegExp(current_charmap);

    return str.replace(regex, function(charToReplace) {
      return current_charmap[charToReplace.charCodeAt(0)] || charToReplace;
    });
  }

  function buildRegExp(charmap){
     return new RegExp('[' + Object.keys(charmap).map(function(code) {return String.fromCharCode(code); }).join(' ') + ']', 'g');
   }

  return normalize;
}));

},{"./charmap":8}],10:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],11:[function(require,module,exports){
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // Node.
    module.exports = pluralize();
  } else if (typeof define === 'function' && define.amd) {
    // AMD, registers as an anonymous module.
    define(function () {
      return pluralize();
    });
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});

},{}],12:[function(require,module,exports){
var ip = require('ip');

module.exports = randomip;

function randomip(address, start, end) {
  var bytes = ip.toBuffer(address);
  var ipv6 = bytes.length === 16;
  var bytesize = 8;

  start = start || 0;
  end = typeof end !== 'undefined' ? end : bytes.length * bytesize;

  for (var i = 0; i < bytes.length; i++) {
    var bit = i * bytesize;

    // skip if nothing to do
    if (bit + bytesize < start || bit >= end) {
      continue;
    }

    var b = bytes[i];

    // insert random bits
    for (var n = 0; n < bytesize; n++) {
      if (bit >= start && bit < end) {
        var bitpos = bytesize - n - 1;
        var bitmask = 1 << bitpos;
        if (Math.random() < 0.5) {
          b |= bitmask;
        }
        else {
          b &= ~(bitmask);
        }
      }
      bit++;
    }

    // save randomized byte
    bytes[i] = b;
  }

  // need an array for formatting
  var tets = [];
  for (var i = 0; i < bytes.length; i++) {
    if (ipv6) {
      if (i % 2 === 0) {
        tets[i >> 1] = (bytes[i] << bytesize | bytes[i + 1]).toString(16);
      }
    }
    else {
      tets[i] = bytes[i];
    }
  }

  return tets.join(ipv6 ? ':' : '.');
}

},{"ip":7}],13:[function(require,module,exports){
'use strict';

var pluralize = require('pluralize');
var normalize = require('normalize-strings');
var problematic = require('./problematic.json');

module.exports = syllables;

var own = {}.hasOwnProperty;

/* Two expressions of occurrences which normally would
 * be counted as two syllables, but should be counted
 * as one. */
var EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
  'cia(l|$)|' +
  'tia|' +
  'cius|' +
  'cious|' +
  '[^aeiou]giu|' +
  '[aeiouy][^aeiouy]ion|' +
  'iou|' +
  'sia$|' +
  'eous$|' +
  '[oa]gue$|' +
  '.[^aeiuoycgltdb]{2,}ed$|' +
  '.ely$|' +
  '^jua|' +
  'uai|' +
  'eau|' +
  '^busi$|' +
  '(' +
    '[aeiouy]' +
    '(' +
      'b|' +
      'c|' +
      'ch|' +
      'dg|' +
      'f|' +
      'g|' +
      'gh|' +
      'gn|' +
      'k|' +
      'l|' +
      'lch|' +
      'll|' +
      'lv|' +
      'm|' +
      'mm|' +
      'n|' +
      'nc|' +
      'ng|' +
      'nch|' +
      'nn|' +
      'p|' +
      'r|' +
      'rc|' +
      'rn|' +
      'rs|' +
      'rv|' +
      's|' +
      'sc|' +
      'sk|' +
      'sl|' +
      'squ|' +
      'ss|' +
      'th|' +
      'v|' +
      'y|' +
      'z' +
    ')' +
    'ed$' +
  ')|' +
  '(' +
    '[aeiouy]' +
    '(' +
      'b|' +
      'ch|' +
      'd|' +
      'f|' +
      'gh|' +
      'gn|' +
      'k|' +
      'l|' +
      'lch|' +
      'll|' +
      'lv|' +
      'm|' +
      'mm|' +
      'n|' +
      'nch|' +
      'nn|' +
      'p|' +
      'r|' +
      'rn|' +
      'rs|' +
      'rv|' +
      's|' +
      'sc|' +
      'sk|' +
      'sl|' +
      'squ|' +
      'ss|' +
      'st|' +
      't|' +
      'th|' +
      'v|' +
      'y' +
    ')' +
    'es$' +
  ')',
  'g'
);

var EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
  '[aeiouy]' +
  '(' +
    'b|' +
    'c|' +
    'ch|' +
    'd|' +
    'dg|' +
    'f|' +
    'g|' +
    'gh|' +
    'gn|' +
    'k|' +
    'l|' +
    'll|' +
    'lv|' +
    'm|' +
    'mm|' +
    'n|' +
    'nc|' +
    'ng|' +
    'nn|' +
    'p|' +
    'r|' +
    'rc|' +
    'rn|' +
    'rs|' +
    'rv|' +
    's|' +
    'sc|' +
    'sk|' +
    'sl|' +
    'squ|' +
    'ss|' +
    'st|' +
    't|' +
    'th|' +
    'v|' +
    'y|' +
    'z' +
  ')' +
  'e$',
  'g'
);

/* Four expression of occurrences which normally would be
 * counted as one syllable, but should be counted as two. */
var EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
  '(' +
    '(' +
      '[^aeiouy]' +
    ')\\2l|' +
    '[^aeiouy]ie' +
    '(' +
      'r|' +
      'st|' +
      't' +
    ')|' +
    '[aeiouym]bl|' +
    'eo|' +
    'ism|' +
    'asm|' +
    'thm|' +
    'dnt|' +
    'uity|' +
    'dea|' +
    'gean|' +
    'oa|' +
    'ua|' +
    'eings?|' +
    '[aeiouy]sh?e[rsd]' +
  ')$',
  'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
  '[^gq]ua[^auieo]|' +
  '[aeiou]{3}|' +
  '^(' +
    'ia|' +
    'mc|' +
    'coa[dglx].' +
  ')',
  'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
  '[^aeiou]y[ae]|' +
  '[^l]lien|' +
  'riet|' +
  'dien|' +
  'iu|' +
  'io|' +
  'ii|' +
  'uen|' +
  'real|' +
  'iell|' +
  'eo[^aeiou]|' +
  '[aeiou]y[aeiou]',
  'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/;

/* Expression to match single syllable pre- and suffixes. */
var EXPRESSION_SINGLE = new RegExp(
  '^' +
  '(' +
    'un|' +
    'fore|' +
    'ware|' +
    'none?|' +
    'out|' +
    'post|' +
    'sub|' +
    'pre|' +
    'pro|' +
    'dis|' +
    'side' +
  ')' +
  '|' +
  '(' +
    'ly|' +
    'less|' +
    'some|' +
    'ful|' +
    'ers?|' +
    'ness|' +
    'cians?|' +
    'ments?|' +
    'ettes?|' +
    'villes?|' +
    'ships?|' +
    'sides?|' +
    'ports?|' +
    'shires?|' +
    'tion(ed)?' +
  ')' +
  '$',
  'g'
);

/* Expression to match double syllable pre- and suffixes. */
var EXPRESSION_DOUBLE = new RegExp(
  '^' +
  '(' +
    'above|' +
    'anti|' +
    'ante|' +
    'counter|' +
    'hyper|' +
    'afore|' +
    'agri|' +
    'infra|' +
    'intra|' +
    'inter|' +
    'over|' +
    'semi|' +
    'ultra|' +
    'under|' +
    'extra|' +
    'dia|' +
    'micro|' +
    'mega|' +
    'kilo|' +
    'pico|' +
    'nano|' +
    'macro' +
  ')' +
  '|' +
  '(' +
    'fully|' +
    'berry|' +
    'woman|' +
    'women' +
  ')' +
  '$',
  'g'
);

/* Expression to match triple syllable suffixes. */
var EXPRESSION_TRIPLE = /(ology|ologist|onomy|onomist)$/g;

/* Expression to split on word boundaries. */
var SPLIT = /\b/g;

/* Expression to remove non-alphabetic characters from
 * a given value. */
var EXPRESSION_NONALPHABETIC = /[^a-z]/g;

/* Wrapper to support multiple word-parts (GH-11). */
function syllables(value) {
  var values = normalize(String(value)).toLowerCase().split(SPLIT);
  var length = values.length;
  var index = -1;
  var total = 0;

  while (++index < length) {
    total += syllable(values[index].replace(EXPRESSION_NONALPHABETIC, ''));
  }

  return total;
}

/* Get syllables in a given value. */
function syllable(value) {
  var count = 0;
  var index;
  var length;
  var singular;
  var parts;
  var addOne;
  var subtractOne;

  if (value.length === 0) {
    return count;
  }

  /* Return early when possible. */
  if (value.length < 3) {
    return 1;
  }

  /* If `value` is a hard to count, it might be
   * in `problematic`. */
  if (own.call(problematic, value)) {
    return problematic[value];
  }

  /* Additionally, the singular word might be
   * in `problematic`. */
  singular = pluralize(value, 1);

  if (own.call(problematic, singular)) {
    return problematic[singular];
  }

  addOne = returnFactory(1);
  subtractOne = returnFactory(-1);

  /* Count some prefixes and suffixes, and remove
   * their matched ranges. */
  value = value
    .replace(EXPRESSION_TRIPLE, countFactory(3))
    .replace(EXPRESSION_DOUBLE, countFactory(2))
    .replace(EXPRESSION_SINGLE, countFactory(1));

  /* Count multiple consonants. */
  parts = value.split(/[^aeiouy]+/);
  index = -1;
  length = parts.length;

  while (++index < length) {
    if (parts[index] !== '') {
      count++;
    }
  }

  /* Subtract one for occurrences which should be
   * counted as one (but are counted as two). */
  value
    .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
    .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne);

  /* Add one for occurrences which should be counted
   * as two (but are counted as one). */
  value
    .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne);

  /* Make sure at least on is returned. */
  return count || 1;

 /* Define scoped counters, to be used
  * in `String#replace()` calls.
  * The scoped counter removes the matched value
  * from the input. */
  function countFactory(addition) {
    return counter;
    function counter() {
      count += addition;
      return '';
    }
  }

 /* Define scoped counters, to be used
  * in `String#replace()` calls.
  * The scoped counter does not remove the matched
  * value from the input. */
  function returnFactory(addition) {
    return returner;
    function returner($0) {
      count += addition;
      return $0;
    }
  }
}

},{"./problematic.json":14,"normalize-strings":9,"pluralize":11}],14:[function(require,module,exports){
module.exports={
  "abalone": 4,
  "abare": 3,
  "abed": 2,
  "abruzzese": 4,
  "abbruzzese": 4,
  "aborigine": 5,
  "acreage": 3,
  "adame": 3,
  "adieu": 2,
  "adobe": 3,
  "anemone": 4,
  "apache": 3,
  "aphrodite": 4,
  "apostrophe": 4,
  "ariadne": 4,
  "cafe": 2,
  "calliope": 4,
  "catastrophe": 4,
  "chile": 2,
  "chloe": 2,
  "circe": 2,
  "coyote": 3,
  "epitome": 4,
  "forever": 3,
  "gethsemane": 4,
  "guacamole": 4,
  "hyperbole": 4,
  "jesse": 2,
  "jukebox": 2,
  "karate": 3,
  "machete": 3,
  "maybe": 2,
  "people": 2,
  "recipe": 3,
  "sesame": 3,
  "shoreline": 2,
  "simile": 3,
  "syncope": 3,
  "tamale": 3,
  "yosemite": 4,
  "daphne": 2,
  "eurydice": 4,
  "euterpe": 3,
  "hermione": 4,
  "penelope": 4,
  "persephone": 4,
  "phoebe": 2,
  "zoe": 2
}

},{}],15:[function(require,module,exports){
"use strict";

var _haikuchecker = require("./../js/haikuchecker.js");

var _haikugenerator = require("./../js/haikugenerator.js");

$(document).ready(function () {
  $("form#formOne").submit(function (event) {
    event.preventDefault();
    // const haiku = [];

    var title = $("input#title").val();
    var lineOne = $("input#lineOne").val();
    var lineTwo = $("input#lineTwo").val();
    var lineThree = $("input#lineThree").val();

    // haiku.push([lineOne, lineTwo, lineThree]);
    var userHaiku = new _haikuchecker.HaikuChecker(lineOne, lineTwo, lineThree);
    var resultLine = userHaiku.CheckLines();
    var resultSyllables = userHaiku.CheckSyllables();

    if (resultLine == true && resultSyllables == true) {
      $("#result").text(title + " is a Haiku");
    } else {
      $("#result").text(title + " is NOT a Haiku");
    }
  });
});

$(document).ready(function () {
  $("button#newHaiku").click(function (event) {
    event.preventDefault();

    var autoHaiku = new _haikugenerator.HaikuGenerator();
    var ipAddress = autoHaiku.GenerateIP();
    console.log(ipAddress);

    var newHaiku = autoHaiku.DecodeIP(ipAddress);
    var haikuArray = newHaiku.split("\n");
    console.log(haikuArray);
    for (var i = 0; i < 3; i++) {
      $("#result").append(haikuArray[i] + "<br>");
    }
  });
});

},{"./../js/haikuchecker.js":1,"./../js/haikugenerator.js":2}]},{},[15]);
