'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babylon = require('babylon');

var _babelTypes = require('babel-types');

var _babelTypes2 = _interopRequireDefault(_babelTypes);

var _astRegenerator = require('./ast-regenerator');

var _astRegenerator2 = _interopRequireDefault(_astRegenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
exports.default = function (jsContentText, options) {

  var ast = (0, _babylon.parse)(jsContentText, {
    plugins: ['./lib/extract-props.js']
  });

  console.log((0, _astRegenerator2.default)(ast));

  // fs.writeFile(
  //   path.join(__dirname, '..', 'demo/ast-react-cmp.json'),
  //   JSON.stringify(ast, null, 2), 'utf-8'
  // )
  // console.log(JSON.stringify(ast, null, 2))

  return { ast: ast };
};

module.exports = exports['default'];