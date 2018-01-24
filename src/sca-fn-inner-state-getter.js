var walk = require('acorn/dist/walk')

module.exports = function (ast) {
  var cmpPropNames = []

  walk.findNodeAt(ast, null, null,
    function (nodeType, node) {
      if (nodeType === 'CallExpression') {
        let { type, object, property } = node.callee
        // this.setState
        if (type === 'MemberExpression' && object.type === 'ThisExpression' && property.name === 'setState') {
          node
        }
      }
    }
  )

  return cmpPropNames
}

function gen_args_metadata (node) {
  console.log(JSON.stringify(node, null, 2))
  console.log('-----------end-----------')
}
