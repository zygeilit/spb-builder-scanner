'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _astGenerator = require('../ast-generator');

var _astGenerator2 = _interopRequireDefault(_astGenerator);

var _outputFile = require('../output-file');

var _outputFile2 = _interopRequireDefault(_outputFile);

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

              // 去掉value中的body
              var _objProp$node = objProp.node,
                  value = _objProp$node.value,
                  rest_node = (0, _objectWithoutProperties3.default)(_objProp$node, ['value']);
              var body = value.body,
                  rest_value = (0, _objectWithoutProperties3.default)(value, ['body']);


              var res = (0, _astGenerator.findAstBySyntaxs)(objProp.node, ['this.state', 'this.setState()']);

              var cmpApiAstJson = (0, _astGenerator2.default)((0, _extends3.default)({}, rest_node, {
                value: (0, _extends3.default)({}, rest_value, {
                  body: body
                })
              }));

              (0, _outputFile2.default)('body/.' + cmpApiAstJson.key.name + '.json', res);

              // 输出测试文件
              (0, _outputFile2.default)('api/.' + cmpApiAstJson.key.name + '.json', cmpApiAstJson);
            });
          }
        }
      } // CallExpression

    }
  };
};

module.exports = exports['default'];