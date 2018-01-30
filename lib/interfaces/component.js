'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = function () {
  function API() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, API);


    // 内部使用的属性
    this.type = '';
    this.inputs = [];
    this.outputs = [];
    this.contextDependencies = [];

    return (0, _defineProperty3.default)({}, opts.visitorName, function () {
      _this.type = _this.getType.apply(_this, arguments);
      _this.contextDependencies = _this.getContextDependencies.apply(_this, arguments);
    });
  }

  // 外部需要实现的接口


  API.prototype.getType = function getType(path, state) {};

  API.prototype.getInputs = function getInputs(path, state) {};

  API.prototype.getOutputs = function getOutputs(path, state) {};

  API.prototype.getContextDependencies = function getContextDependencies(path, state) {};

  API.prototype.generate = function generate() {
    return {
      'type': this.getType(),
      'inputs': this.getInputs(),
      'outputs': this.getOutputs(),
      'contextDependencies': this.getContextDependencies()
    };
  };

  return API;
}();

exports.default = API;
module.exports = exports['default'];