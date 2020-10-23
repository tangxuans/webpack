const path = require('path')

process.chdir(path.join(__dirname,'smoke/template'))


describe('builder-webpacl test care',()=>{
     require('./unit/webpack-base-test')
})