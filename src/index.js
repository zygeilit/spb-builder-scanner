import { transform } from 'babel-core'

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
export default (jsContentText, options) => {

  let { ast } = transform(jsContentText, {
    ast: true, // Include the AST in the returned object
    babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
    plugins: [
      './lib/extract-props.js'
    ]
  })

  return {
    ast
  }
}
