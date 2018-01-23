
var walk = require("acorn/dist/walk")

module.exports = function (ast) {
  walk.findNodeAt(ast, null, null,
    function (nodeType, node) {
      // find: let|const|var <cmp-name> = React.createClass({ ... })
      if (nodeType === 'CallExpression') {
        let { type, object, property } = node.callee
        // React.createClass
        if (type === 'MemberExpression' && object.name === 'React' && property.name === 'createClass') {
          let [{ properties }] = node.arguments
          for (var i = 0; i < properties.length; i++) {
            console.log(properties[i].key.name)
          }
        }
      }
    }
  )
}
