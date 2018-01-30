import t from 'babel-types'
import { generate } from 'ast-generator'

export default class MetadataInterface {
  constructor (opts = {}) {

    let {
      cmpMatcher,
    } = opts

    // 内部使用的属性
    this.type = ''
    this.inputs = []
    this.outputs = []
    this.contextDependencies = []

    return {
      [opts.visitorName]: (...args) => {

        // 匹配到组件
        if (matcher(...args)) {

          // 获取组件属性
          apiPropertiesGetter(...args).forEach(propertyAst => {

            // 获取函数签名|输入|inputs
            this.inputs = propertyAst.get('params').map(param => {
              return generate(param)
            })

            objProp.traverse({
              'MemberExpression' (path) {

              }
            })
          }) // cmpPropertiesGetter
        } // if
      }
    }
  }

  /*
   匹配组件AST节点的函数
  */
  matcher (path) {
    let callee = path.get('callee')
    if (t.isMemberExpression(callee) && callee.get('object').isIdentifier({ name: 'React' }) && callee.get('property').isIdentifier({ name: 'createClass' })) {
      return true
    }
  }

  apiPropContextStateMatcher (path) {
    let object = path.get('object')
    if (object.isMemberExpression() && object.get('object').isThisExpression && object.get('property').isIdentifier({ name: 'state' })) {
      return true
    }
  }

  propsGetter (path) {}

  apiPropsGetter (path) {
    return path.get('arguments.0').get('properties')
  }

  apiPropContextStateGetter (path) {

  }

  apiPropContextThisGetter (path) {

  }

  generate () {
    return {
      'type': this.getType(),
      'inputs': this.getInputs(),
      'outputs': this.getOutputs(),
      'contextDependencies': this.getContextDependencies()
    }
  }
}
