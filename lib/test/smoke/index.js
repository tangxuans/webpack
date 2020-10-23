const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
    timeout:'10000ms'
})


 process.chdir(path.join(__dirname,'template'))

rimraf('./dist',()=>{
    const prodConfig = require("../../lib/webpack.prod")
    webpack(prodConfig,(err,stats)=>{
        if(err){
            console.log(123)
            console.error(1234)
            process.exit(555)
        }
        console.log("success-stats",stats.toString({
            colors:true,
            modules:false,
            children:false
        }))
        console.log("webpack build success,begin run test")
        mocha.addFile(path.join(__dirname,'html-test.js'));
        mocha.addFile(path.join(__dirname,'css-js -test.js'));
        mocha.run();
    })
})