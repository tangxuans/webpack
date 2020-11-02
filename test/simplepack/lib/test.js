const {getAST,getDependencise,transform} = require("./parser")
const path = require('path')

const ast = getAST(path.join(__dirname,'../src/index.js'))
// console.log(ast)
const dep = getDependencise(ast)
// console.log(dep)
const trsfm = transform(ast)
console.log(trsfm)

