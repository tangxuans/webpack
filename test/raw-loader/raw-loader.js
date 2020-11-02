//编写一个将文件转换为string的loader
const loaderUtils = require('loader-utils')
const fs = require("fs")
const path = require("path")
module.exports = function(source){
    // console.log("source",source)
    this.cacheable(false)
    const {name} = loaderUtils.getOptions(this)
    const callback = this.async()//实现异步loader
    // console.log("name",name)
    const json = JSON.stringify(source)
                .replace('你看','木头人')
                .replace(/\u2028/g,'\\u2028')
                .replace(/\u2029/g,'\\u2029')
    fs.readFile(path.join(__dirname,'./src/async.txt'),'utf-8',(err,data)=>{
        this.callback(null,json)
    })            
    // this.callback(null,json)                
    // return `export default ${json}`
}