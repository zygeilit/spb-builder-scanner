import { transform } from 'babel-core'
import jsonpath from 'jsonpath-plus'
import parser from './parser'

import { diffJson } from 'diff'
import 'colors'

// AST节点上将被移除的的属性
let ignoredProps = new Set([
  'start',
  'end',
  'loc',
  'id',
  'tokens',
  'comments'
])

export default (node, opts = {}) => {
  return generator(node)
}

/*
 格式化Babel.transform输出的AST对象到标准JSON对象
 通过ignoredProps对象的配置，删除AST对象中各个节点内的不必要属性
*/
export const generator = (node) => {

  // 重新转换的AST纯JSON格式数据
  let regeneratedNode = {}

  Object.keys(node)
    .map(key => {
      return { key, value: node[key] }
    })

    // 过滤掉不需要的属性，在.builder中保存的AST元数据不需要的属性
    .filter(({ key }) => !ignoredProps.has(key))

    // 循环属性对象，转换成JSON格式
    .forEach(({ key, value }) => {

      // 循环遍历子节点，如果value不是对象则继续递归遍历
      if (value && typeof value === 'object') {
        let regenerated_value = generator(value)

        // 如果 value 是数组对象，则转换成真是数组JSON
        // 在AST对象中如BlockStatement中会有body的描述，是数组结构
        value = Array.isArray(value) ?
                  Object.values(regenerated_value) : regenerated_value
      }

      // 添加格式化后的节点
      regeneratedNode[key] = value
    })

  return regeneratedNode
}

/*
 获取传入的includes语法的 ASTJSON 对象，用于查找
*/
export const findAstBySyntaxs = (node, includes = []) => {
  if (!includes.length) {
    return generator(node)
  }

  let nodeAstJson = generator(node)
  let includesSyntaxBody = []

  includes

    // 提取 ASTJSON 对象中的语法部分
    .map(syntax => {
      return jsonpath({
        // [data].program.body
        // 使用includes语法生成 ASTJSON 描述，包裹着 program 和 body 对象
        // 直接取内部的语法描述
        path: '$..body.*.expression',

        // 生成标准的 AST JSON 格式描述    
        json: generator(parser(syntax))
      })
    })

    // 遍历 includes 中传入的语法, node上查找是否有相同节点
    .forEach(syntaxAstJson => {
      
      // ...通过对象的方式find

    })

  return includesSyntaxBody
}
