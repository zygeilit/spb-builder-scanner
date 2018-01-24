'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var walk = require('acorn/dist/walk');

module.exports = function (ast) {
  var cmpPropNames = [];

  walk.findNodeAt(ast, null, null, function (nodeType, node) {
    if (nodeType === 'CallExpression') {
      var _node$callee = node.callee,
          type = _node$callee.type,
          object = _node$callee.object,
          property = _node$callee.property;
      // this.setState

      if (type === 'MemberExpression' && object.type === 'ThisExpression' && property.name === 'setState') {
        node;
      }
    }
  });

  return cmpPropNames;
};

function gen_args_metadata(node) {
  console.log((0, _stringify2.default)(node, null, 2));
  console.log('-----------end-----------');
}