'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (filename, content) {
  _fs2.default.writeFile(_path2.default.join(__dirname, '..', 'test/' + filename), (0, _stringify2.default)(content, null, 2), 'utf-8');
};

module.exports = exports['default'];