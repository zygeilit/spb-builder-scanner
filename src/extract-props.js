
let traverse = require('babel-traverse').default
let objass = require('object-assign')

module.exports = function ({ types: t }) {
  return {
    visitor: {
      'CallExpression' (path) {
        let callee = path.get('callee')
        if (t.isMemberExpression(callee)) {
          if(callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            let objProp = path.get('arguments.0').get('properties').forEach(objProp => {
              let node = objass({}, objProp.node, { value: {} })
              let value = objass({}, objProp.get('value').node, { body: [] })
              console.log(JSON.stringify(objass({}, node, { value }), null, 2))
            })
          }
        }
      }// CallExpression
    }
  }
}
