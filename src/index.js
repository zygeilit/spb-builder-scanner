import parser from './parser'

/*
 扫描功能入口
 接受js代码文本，可接受acorn.parse的配置参数
*/
export default (jsContentText) => {
  let ast = parser(jsContentText)
  return { ast }
}
