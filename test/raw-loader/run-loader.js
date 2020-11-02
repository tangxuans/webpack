const {runLoaders} = require('loader-runner')
const fs = require('fs')
const path = require('path')

runLoaders({
    resource:path.join(__dirname,'./src/demo.txt'),
    loaders:[
        {
            loader:path.join(__dirname,'./raw-loader.js'),
            options:{
                name:"wumao"
            }
        }
    ],
    context:{
        minimize : true
    },
    readResource:fs.readFile.bind(fs)
},(err,result) => {
    err ? console.log(err) : console.log(result)
})