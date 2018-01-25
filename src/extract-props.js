import traverse from 'babel-traverse'
import generator, { findAstBySyntaxs } from './ast-generator'
import ouput from './output-file'

export default ({ types: t }) => {
  return {
    visitor: {
      'CallExpression' (path, state) {
        let callee = path.get('callee')
        if (t.isMemberExpression(callee)) {
          if(callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            let objProp = path.get('arguments.0').get('properties').forEach(objProp => {

              // 去掉value中的body
              let { value, ...rest_node } = objProp.node
              let { body, ...rest_value } = value

              let res = findAstBySyntaxs(objProp.node, [ 'this.state', 'this.setState()' ])

              let cmpApiAstJson = generator({
                ...rest_node,
                value: {
                  ...rest_value,
                  body
                }
              })

              ouput(`body/.${cmpApiAstJson.key.name}.json`, res)

              // 输出测试文件
              ouput(`api/.${cmpApiAstJson.key.name}.json`, cmpApiAstJson)

            })
          }
        }
      }// CallExpression
    }
  }
}
