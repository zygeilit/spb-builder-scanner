'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _babelCore = require('babel-core');

var _featureExtracters = require('./feature-extracters');

var _featureExtracters2 = _interopRequireDefault(_featureExtracters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (content) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return (0, _babelCore.transform)(content, (0, _extends3.default)({
    ast: true, // Include the AST in the returned object
    babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
    plugins: [].concat((0, _toConsumableArray3.default)(_featureExtracters2.default))
  }, opts)).ast; // 只返回ast对象
};

module.exports = exports['default'];