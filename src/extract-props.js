import traverse from 'babel-traverse'

export default ({ types: t }) => {
  return {
    visitor: {
      'CallExpression' (path) {
        let callee = path.get('callee')
        if (t.isMemberExpression(callee)) {
          if(callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            let objProp = path.get('arguments.0').get('properties').forEach(objProp => {

              let { value, ...rest_node } = objProp.node
              let { body, ...rest_value } = value

              let node = Object.assign({}, objProp.node, { value: {} })
              let value = Object.assign({}, objProp.get('value').node, { body: [] })

              console.log(
                JSON.stringify({
                  ...rest_node,
                  {
                    ...rest_value,
                    body: []
                  }
                },null, 2)
              )

            })
          }
        }
      }// CallExpression
    }
  }
}
