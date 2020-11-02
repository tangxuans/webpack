const {getAST,getDependencise,transform} = require("./parser")
const path = require('path')
const fs = require("fs")
module.exports = class Compiler {
    constructor(options){
        const {entry,output} = options
        this.entry = entry
        this.output = output
        this.modules = [] //存储所有的构建模块
        // console.log("entry output",entry,output)
    }

    run () {//入口
        const entryMoudle = this.buildModule(this.entry,true)
        this.modules.push(entryMoudle)
        this.modules.map((_module)=>{
            // console.log("_module",_module)
            _module.dependencise.map((dependency)=>{
                this.modules.push(this.buildModule(dependency))
            })
        })
        // console.log("this.modules",this.modules)
        this.emitFiles()
    }

    buildModule (filename,isEntry) {//模块构建
        let ast;
        if(isEntry){//如果是入口文件
            ast = getAST(filename)
        }else{//如果不是入口文件，比如依赖的文件
            //process.cwd() 方法会返回 Node.js 进程的当前工作目录。
            //将相对路径改为绝对路劲
            let absolutePath = path.join(process.cwd(),'./src',filename)
            ast = getAST(absolutePath)
        }
        return{
            filename,
            dependencise:getDependencise(ast),//依赖
            source:transform(ast)//编译后的代码
        }
    }

    emitFiles () {//文件输出
        const outputPath = path.join(this.output.path,this.output.filename)//输出路径
        let modules = ''
        this.modules.map((_module)=>{
            modules += `'${_module.filename}':function(require,module,exports){${_module.source}},`
        })

        const bundle = `(function (modules) {
        console.log("modules",modules);

            function require(filename) {
                console.log("filename",filename);
                var fn = modules[filename]
                console.log("fn",fn,typeof fn)
                var module = {exports:{}}
                fn(require,module,module.exports)
                // console.log("11111module.exports",module.exports)
                return module.exports
            }
            require("${this.entry}")
        })({${modules}})`
        console.log("bundle.js",bundle)
        fs.writeFileSync(outputPath,bundle,'utf-8')
    }
}