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

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _astRegenerator = require('./ast-regenerator');

var _astRegenerator2 = _interopRequireDefault(_astRegenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      'CallExpression': function CallExpression(path, state) {
        var callee = path.get('callee');
        if (t.isMemberExpression(callee)) {
          if (callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            var objProp = path.get('arguments.0').get('properties').forEach(function (objProp) {

              // console.log(regenerator.transform(state.code))

              var ast1 = (0, _astRegenerator2.default)(objProp.node);

              _fs2.default.writeFile(_path2.default.join(__dirname, '..', 'test', 'output.json'), (0, _stringify2.default)(ast1, null, 2), 'utf-8');
              // console.log(
              // JSON.stringify(ast1, null, 2)
              // )

              // let { value, ...rest_node } = objProp.node
              // let { body, ...rest_value } = value

              // console.log(
              //   JSON.stringify({
              //     ...rest_node,
              //     value: {
              //       ...rest_value,
              //       body: []
              //     }
              //   }, null, 2)
              // )
            });
          }
        }
      } // CallExpression

    }
  };
};

module.exports = exports['default'];