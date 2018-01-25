import { transform } from 'babel-core'

export default (content, opts = {}) => {
  return transform(
    content,
    Object.assign(
      {
        ast: true, // Include the AST in the returned object
        babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
        plugins: [
          './lib/extract-props.js'
        ]
      },
      opts
    )
  ).ast // 只返回ast对象
}
