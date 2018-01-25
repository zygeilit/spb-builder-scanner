'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
exports.default = function (jsContentText) {
  var ast = (0, _parser2.default)(jsContentText);
  return { ast: ast };
};

module.exports = exports['default'];