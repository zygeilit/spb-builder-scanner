'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babelCore = require('babel-core');

var _babelTypes = require('babel-types');

var _babelTypes2 = _interopRequireDefault(_babelTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
exports.default = function (jsContentText, options) {
  var _babelTransform = (0, _babelCore.transform)(jsContentText, {
    ast: true, // Include the AST in the returned object
    babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
    plugins: ['./lib/extract-props.js']
  }),
      ast = _babelTransform.ast;

  // fs.writeFile(
  //   path.join(__dirname, '..', 'demo/ast-react-cmp.json'),
  //   JSON.stringify(ast, null, 2), 'utf-8'
  // )
  // console.log(JSON.stringify(ast, null, 2))

  return {
    ast: ast
  };
};

module.exports = exports['default'];