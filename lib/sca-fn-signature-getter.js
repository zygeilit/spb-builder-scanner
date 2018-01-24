'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var walk = require('acorn/dist/walk');

module.exports = function (ast) {
  var cmpPropNames = [];

  walk.findNodeAt(ast, null, null, function (nodeType, node) {
    // find: let|const|var <cmp-name> = React.createClass({ ... })
    if (nodeType === 'CallExpression') {
      var _node$callee = node.callee,
          type = _node$callee.type,
          object = _node$callee.object,
          property = _node$callee.property;
      // React.createClass

      if (type === 'MemberExpression' && object.name === 'React' && property.name === 'createClass') {
        var _node$arguments = (0, _slicedToArray3.default)(node.arguments, 1),
            properties = _node$arguments[0].properties;

        for (var i = 0; i < properties.length; i++) {
          var meta = gen_signature_metadata(properties[i]);
          var body = properties[i].value.body;
        }
      }
    }
  });

  return cmpPropNames;
};

function gen_signature_metadata(property) {
  var key = property.key,
      value = property.value;
  var key_type = key.type,
      key_name = key.name;
  var val_type = value.type,
      _value$id = value.id,
      id = _value$id === undefined ? '' : _value$id,
      _value$generator = value.generator,
      generator = _value$generator === undefined ? false : _value$generator,
      _value$expression = value.expression,
      expression = _value$expression === undefined ? false : _value$expression,
      _value$params = value.params,
      params = _value$params === undefined ? [] : _value$params;

  // 过滤 params ast 对象

  var val_params = [];
  for (var i = 0; i < params.length; i++) {
    var _params$i = params[i],
        type = _params$i.type,
        name = _params$i.name;

    val_params.push({ type: type, name: name });
  }

  return {
    key: {
      type: key_type,
      name: key_name
    },
    value: {
      type: val_type,
      params: val_params,
      generator: generator,
      expression: expression,
      body: {} // 属性内部细节
    }
  };
}