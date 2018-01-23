var acorn = require('acorn')
var objass = require('object-assign')

var fnSignatureGetter = require('./sca-fn-signature-getter')
var propertiesGetter = require('./sca-properties-getter')

require('acorn-jsx/inject')(acorn)
require('acorn-es7-plugin')(acorn)

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
module.exports = function scan(jsContentText, options) {

  // 把js文本转化为acorn对象
  var ast = acorn.parse(jsContentText, objass({}, options, {
    'sourceType': 'module', // 支持import/export
    'locations': false, // 是否携带行号，列好
    // 'ranges': false,
    'plugins': { jsx: true }
  }))

  // 获取组件内方法签名
  fnSignatureGetter(ast)

  return {
    'ast': ast
  }
}
