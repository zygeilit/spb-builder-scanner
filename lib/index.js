'use strict';

var fs = require('fs');
var path = require('path');
var babelTransform = require('babel-core').transform;
var babelTypes = require('babel-types');

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
module.exports = function scan(jsContentText, options) {
  var _babelTransform = babelTransform(jsContentText, {
    ast: true, // Include the AST in the returned object
    babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
    plugins: ['./src/extract-props.js'],
    tokens: [{
      start1123: 0
    }]
  }),
      ast = _babelTransform.ast;

  // fs.writeFile(
  //   path.join(__dirname, '..', 'demo/ast-react-cmp.json'),
  //   JSON.stringify(ast, null, 2), 'utf-8'
  // )
  // console.log(JSON.stringify(ast, null, 2))

  return {
    'ast': ast
  };
};