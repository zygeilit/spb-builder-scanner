import traverse from 'babel-traverse'
import generator, { findAstBySyntaxs } from '../ast-generator'
import ouput from '../output-file'

export default ({ types: t }) => {
  return {
    visitor: {
      'CallExpression' (path) {
        let callee = path.get('callee')
        if (t.isMemberExpression(callee)) {
          if(callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            let objProp = path.get('arguments.0').get('properties').forEach(objProp => {

              // 获取 this.state.[attrs]
              let syntaxs = {
                'this.state.*': []
              }

              objProp.traverse({
                'MemberExpression' (path) {
                  let object = path.get('object')
                  if (object.isMemberExpression() && object.get('object').isThisExpression && object.get('property').isIdentifier({ name: 'state' })) {
                    // 把找到的语法AST缓存起来
                    syntaxs['this.state.*'].push(
                      generator(path.node)
                    )
                  }
                }
              })

              // 去掉value中的body
              let { value, ...rest_node } = objProp.node
              let { body, ...rest_value } = value

              let cmpApiAstJson = generator({
                ...rest_node,
                value: {
                  ...rest_value,
                  body: syntaxs['this.state.*']
                }
              })

              // ouput(`body/.${cmpApiAstJson.key.name}.json`, res)

              // 输出测试文件
              ouput(`api/.${cmpApiAstJson.key.name}.json`, cmpApiAstJson)

            })
          }
        }
      }// CallExpression
    }
  }
}
