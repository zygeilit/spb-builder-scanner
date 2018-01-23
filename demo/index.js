
var fs = require('fs')
var path = require('path')
var scan = require('../src/index.js')

var domeFilePath = path.join(__dirname, '/todos/js/todoItem.js')
var jsDomeFileContent = fs.readFileSync(domeFilePath, { encoding: 'utf8' })

var { ast } = scan(jsDomeFileContent)

fs.writeFile(
  path.join(__dirname, 'ast-react-cmp.json'),
  JSON.stringify(ast, null, 2)
)
