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
      if (this.lineOne !== "" && this.lineTwo !== "" && this.lineThree !== "") {
        return true;
      }

      //
    }
  }]);

  return HaikuChecker;
}();

},{}],2:[function(require,module,exports){
"use strict";

var _haikuchecker = require("./../js/haikuchecker.js");

$(document).ready(function () {
  $("form#formOne").submit(function (event) {
    event.preventDefault();
    var haiku = [];

    var lineOne = $("input#lineOne").val();
    var lineTwo = $("input#lineTwo").val();
    var lineThree = $("input#lineThree").val();

    poem.push([lineOne, lineTwo, lineThree]);
  });

  var userHaiku = new _haikuchecker.HaikuChecker();

  var result = userHaiku.CheckAll(haiku[0], haiku[1], haiku[2]);

  if (result == true) {
    $("result").text("Is a Haiku");
  } else {
    $("result").text("Is NOT a Haiku");
  }
});

},{"./../js/haikuchecker.js":1}]},{},[2]);
