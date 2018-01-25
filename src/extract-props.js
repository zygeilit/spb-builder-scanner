import fs from 'fs'
import path1 from 'path'
import traverse from 'babel-traverse'
import astRegenerator from './generator'

export default ({ types: t }) => {
  return {
    visitor: {
      'CallExpression' (path, state) {
        let callee = path.get('callee')
        if (t.isMemberExpression(callee)) {
          if(callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
            let objProp = path.get('arguments.0').get('properties').forEach(objProp => {

              let ast1 = astRegenerator(objProp.node)
              // ast1.value.body = []

              fs.writeFile(
                path1.join(__dirname, '..', 'test',`api/.${ast1.key.name}.json`),
                JSON.stringify(ast1, null, 2), 'utf-8'
              )

              // let { value, ...rest_node } = objProp.node
              // let { body, ...rest_value } = value

              // console.log(
              //   JSON.stringify({
              //     ...rest_node,
              //     value: {
              //       ...rest_value,
              //       body: []
              //     }
              //   }, null, 2)
              // )

            })
          }
        }
      }// CallExpression
    }
  }
}
