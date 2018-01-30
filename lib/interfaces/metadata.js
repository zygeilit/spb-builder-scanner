'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _babelTypes = require('babel-types');

var _babelTypes2 = _interopRequireDefault(_babelTypes);

var _astGenerator = require('ast-generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MetadataInterface = function () {
  function MetadataInterface() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MetadataInterface);
    var cmpMatcher = opts.cmpMatcher;

    // 内部使用的属性

    this.type = '';
    this.inputs = [];
    this.outputs = [];
    this.contextDependencies = [];

    return (0, _defineProperty3.default)({}, opts.visitorName, function () {

      // 匹配到组件
      if (matcher.apply(undefined, arguments)) {

        // 获取组件属性
        apiPropertiesGetter.apply(undefined, arguments).forEach(function (propertyAst) {

          // 获取函数签名|输入|inputs
          _this.inputs = propertyAst.get('params').map(function (param) {
            return (0, _astGenerator.generate)(param);
          });

          objProp.traverse({
            'MemberExpression': function MemberExpression(path) {}
          });
        }); // cmpPropertiesGetter
      } // if
    });
  }

  /*
   匹配组件AST节点的函数
  */


  MetadataInterface.prototype.matcher = function matcher(path) {
    var callee = path.get('callee');
    if (_babelTypes2.default.isMemberExpression(callee) && callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
      return true;
    }
  };

  MetadataInterface.prototype.apiPropContextStateMatcher = function apiPropContextStateMatcher(path) {
    var object = path.get('object');
    if (object.isMemberExpression() && object.get('object').isThisExpression && object.get('property').isIdentifier({ name: 'state' })) {
      return true;
    }
  };

  MetadataInterface.prototype.propsGetter = function propsGetter(path) {};

  MetadataInterface.prototype.apiPropsGetter = function apiPropsGetter(path) {
    return path.get('arguments.0').get('properties');
  };

  MetadataInterface.prototype.apiPropContextStateGetter = function apiPropContextStateGetter(path) {};

  MetadataInterface.prototype.apiPropContextThisGetter = function apiPropContextThisGetter(path) {};

  MetadataInterface.prototype.generate = function generate() {
    return {
      'type': this.getType(),
      'inputs': this.getInputs(),
      'outputs': this.getOutputs(),
      'contextDependencies': this.getContextDependencies()
    };
  };

  return MetadataInterface;
}();

exports.default = MetadataInterface;
module.exports = exports['default'];