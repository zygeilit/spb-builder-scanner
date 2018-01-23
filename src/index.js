
var acorn = require('acorn')
var objass = require('object-assign')

// 不同维度的信息提取的实现，对应到某一个文件
var fnSignatureGetter = require('./sca-fn-signature-getter') // 函数签名
var propertiesGetter = require('./sca-properties-getter') // 组件属性列表

// 初始化配置acorn
require('acorn-jsx/inject')(acorn) // 支持 React JSX 语法
require('acorn-es7-plugin')(acorn) // 支持 ES7 语法

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

  fnSignatureGetter(ast)

  return {
    'ast': ast
  }
}
