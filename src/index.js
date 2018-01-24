import fs from 'fs'
import path from 'path'
import { transform as babelTransform } from 'babel-core'
import babelTypes from 'babel-types'

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
export default (jsContentText, options) => {

  let { ast } = babelTransform(jsContentText, {
    ast: true, // Include the AST in the returned object
    babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
    plugins: [
      './lib/extract-props.js'
    ]
  })

  // fs.writeFile(
  //   path.join(__dirname, '..', 'demo/ast-react-cmp.json'),
  //   JSON.stringify(ast, null, 2), 'utf-8'
  // )
  // console.log(JSON.stringify(ast, null, 2))

  return {
    ast
  }
}
