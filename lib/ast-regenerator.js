'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.default = _ast_regenerator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// AST节点上将被移除的的属性
var ignoredProps = new _set2.default(['start', 'end', 'loc', 'method', 'shorthand', 'computed', 'generator', 'expression', 'async', 'id']);

/*
 格式化Babel.transform输出的AST对象到标准JSON对象
 通过ignoredProps对象的配置，删除AST对象中各个节点内的不必要属性
*/
function _ast_regenerator(node) {

  // 重新转换的AST纯JSON格式数据
  var regeneratedNode = {};

  (0, _keys2.default)(node).map(function (key) {
    return { key: key, value: node[key] };
  })

  // 过滤掉不需要的属性，在.builder中保存的AST元数据不需要的属性
  .filter(function (_ref) {
    var key = _ref.key;
    return !ignoredProps.has(key);
  })

  // 循环属性对象，转换成JSON格式
  .forEach(function (_ref2) {
    var key = _ref2.key,
        value = _ref2.value;


    // 循环遍历子节点，如果value不是对象则继续递归遍历
    if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      var regenerated_value = _ast_regenerator(value);

      // 如果 value 是数组对象，则转换成真是数组JSON
      // 在AST对象中如BlockStatement中会有body的描述，是数组结构
      value = Array.isArray(value) ? (0, _values2.default)(regenerated_value) : regenerated_value;
    }

    // 添加格式化后的节点
    regeneratedNode[key] = value;
  });

  return regeneratedNode;
}
module.exports = exports['default'];