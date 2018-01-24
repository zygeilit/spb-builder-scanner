'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var traverse = require('babel-traverse').default;
var objass = require('object-assign');

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      'CallExpression': function CallExpression(path) {
        var callee = path.get('callee');
        if (t.isMemberExpression(callee)) {
          if (callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            var objProp = path.get('arguments.0').get('properties').forEach(function (objProp) {
              var node = objass({}, objProp.node, { value: {} });
              var value = objass({}, objProp.get('value').node, { body: [] });
              console.log((0, _stringify2.default)(objass({}, node, { value: value }), null, 2));
            });
          }
        }
      } // CallExpression

    }
  };
};