if(typeof window === 'undefined'){
    global.window = {}
}
const fs = require('fs')
const path = require('path')
const express = require('express')
const {renderToString} = require("react-dom/server")
const SSR = require('../dist/search-server.js')
const template = fs.readFileSync(path.join(__dirname,'../dist/search.html'),'utf-8')
console.log(" template",template,SSR)
const server = (port ) => {
    const app = express();
    app.use(express.static('dist'))
    app.get('/search',(req,res)=>{
        const html = renderMarkup(renderToString(SSR))
        res.status(200).send(html)
    })

    app.listen(port,()=>{
        console.log("Server is running on port:"+port)
    })
}
server(process.env.port||3000)

//将字符串改成html
const renderMarkup = (str) => {
    return template.replace('<!--HTML_PLACEHOLDER-->',str)
}