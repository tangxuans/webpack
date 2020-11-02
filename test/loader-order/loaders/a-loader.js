const loaderUtils = require('loader-utils')
console.log("loaderUtils",loaderUtils)
module.exports = function(source){
        console.log('Loader a is excuted')
        //this.emitFile(文件名，输出内容)
        const url = loaderUtils.interpolateName(this,'[name].[ext]',source)
        console.log("url",url)
        this.emitFile(url,source)
        return source
}