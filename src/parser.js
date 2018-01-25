import { transform } from 'babel-core'
import features from './feature-extracters'

export default (content, opts = {}) => {
  return transform(
    content,
    Object.assign(
      {
        ast: true, // Include the AST in the returned object
        babelrc: true, // Specify whether or not to use .babelrc and .babelignore files
        plugins: [
          ...features  
        ]
      },
      opts
    )
  ).ast // 只返回ast对象
}
