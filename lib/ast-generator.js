'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAstBySyntaxs = exports.generator = undefined;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _babelCore = require('babel-core');

var _jsonpathPlus = require('jsonpath-plus');

var _jsonpathPlus2 = _interopRequireDefault(_jsonpathPlus);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// AST节点上将被移除的的属性
var ignoredProps = new _set2.default(['start', 'end', 'loc', 'id', 'tokens', 'comments']);

exports.default = function (node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return generator(node);
};

/*
 格式化Babel.transform输出的AST对象到标准JSON对象
 通过ignoredProps对象的配置，删除AST对象中各个节点内的不必要属性
*/


var generator = exports.generator = function generator(node) {

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
      var regenerated_value = generator(value);

      // 如果 value 是数组对象，则转换成真是数组JSON
      // 在AST对象中如BlockStatement中会有body的描述，是数组结构
      value = Array.isArray(value) ? (0, _values2.default)(regenerated_value) : regenerated_value;
    }

    // 添加格式化后的节点
    regeneratedNode[key] = value;
  });

  return regeneratedNode;
};

/*
 获取传入的includes语法的 ASTJSON 对象，用于查找
*/
var findAstBySyntaxs = exports.findAstBySyntaxs = function findAstBySyntaxs(node) {
  var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!includes.length) {
    return generator(node);
  }

  var nodeAstJson = generator(node);
  var includesSyntaxBody = [];

  includes

  // 提取 ASTJSON 对象中的语法部分
  .map(function (syntax) {

    return (0, _jsonpathPlus2.default)({
      // [data].program.body
      // 使用includes语法生成 ASTJSON 描述，包裹着 program 和 body 对象
      // 直接取内部的语法描述
      path: '$..body.*.expression',

      // 生成标准的 AST JSON 格式描述    
      json: generator((0, _parser2.default)(syntax))
    });
  })

  // 遍历 includes 中传入的语法, node上查找是否有相同节点
  .forEach(function (syntaxAstJson) {

    // ...

  });

  return includesSyntaxBody;
};