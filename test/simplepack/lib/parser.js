const babylon = require('babylon')
const fs = require('fs')
const traverse = require('babel-traverse').default
const {transformFromAst} = require('babel-core')
module.exports = {
    getAST: (path)=>{//将源代码做树状分析，es6变成ast
        const source = fs.readFileSync(path,'utf-8')
        return babylon.parse(source,{
            sourceType:'module'
        })
    },
    getDependencise:(ast)=>{//分析依赖
        const dependencise = []
        traverse(ast,{
            //分析import语句
            ImportDeclaration:({node})=>{
                dependencise.push(node.source.value)
            }
        })
        return dependencise
    },
    transform:(ast)=>{//将ast转换为es5
        const {code} = transformFromAst(ast,null,{
            presets:['env']
        })
        return code
    }
}