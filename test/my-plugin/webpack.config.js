const path = require('path')
const MuPlugin = require('./plugins/my-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'main.js'
    },
    mode:'production',
    plugins:[
        new MuPlugin({
            name:'my-plugin'
        })
    ]
}