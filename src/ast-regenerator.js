
// AST节点上将被移除的的属性
let ignoredProps = new Set([
  'start',
  'end',
  'loc',
  'method',
  'shorthand',
  'computed',
  'generator',
  'expression',
  'async',
  'id'
])

/*
 格式化Babel.transform输出的AST对象到标准JSON对象
 通过ignoredProps对象的配置，删除AST对象中各个节点内的不必要属性
*/
export default function _ast_regenerator (node) {

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
        let regenerated_value = _ast_regenerator(value)

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
