'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelCore = require('babel-core');

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
exports.default = function (jsContentText, options) {
  var _transform = (0, _babelCore.transform)(jsContentText, {
    ast: true, // Include the AST in the returned object
    babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
    plugins: ['./lib/extract-props.js']
  }),
      ast = _transform.ast;

  return {
    ast: ast
  };
};

module.exports = exports['default'];