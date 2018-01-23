var walk = require('acorn/dist/walk')

module.exports = function (ast) {
  var cmpPropNames = []

  walk.findNodeAt(ast, null, null,
    function (nodeType, node) {
      // find: let|const|var <cmp-name> = React.createClass({ ... })
      if (nodeType === 'CallExpression') {
        let { type, object, property } = node.callee
        // React.createClass
        if (type === 'MemberExpression' && object.name === 'React' && property.name === 'createClass') {
          let [{ properties }] = node.arguments
          for (var i = 0; i < properties.length; i++) {
            cmpPropNames.push(
              gen_signature_metadata(properties[i])
            )
          }
        }
      }
    }
  )

  return cmpPropNames
}

function gen_signature_metadata (property) {
  var { key, value } = property
  var { type: key_type, name: key_name } = key
  var { type: val_type, id = '', generator = false, expression = false, params = [] } = value

  // 过滤 params ast 对象
  var val_params = []
  for (var i = 0; i < params.length; i++) {
    var { type, name } = params[i]
    val_params.push({ type, name })
  }

  return {
    key: {
      type: key_type,
      name: key_name
    },
    value: {
      type: val_type,
      params: val_params,
      generator,
      expression
    }
  }
}

// DEMO
// {
//   "key": {
//     "type": "Identifier",
//     "name": "shouldComponentUpdate"
//   },
//   "value": {
//     "type": "FunctionExpression",
//     "params": [
//       {
//         "type": "Identifier",
//         "name": "nextProps"
//       },
//       {
//         "type": "Identifier",
//         "name": "nextState"
//       }
//     ],
//     "generator": false,
//     "expression": false
//   }
// }
