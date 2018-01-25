import fs from 'fs'
import path from 'path'

export default (filename, content) => {
  fs.writeFile(
    path.join(__dirname, '..', `test/${filename}`),
    JSON.stringify(content, null, 2),
    'utf-8'
  )
}
