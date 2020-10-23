const path = require('path')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//webpack4使用optimize-css-assets-webpack-plugin压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')//html压缩
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//清理构建目录
const glob = require('glob')

// 动态设置html和entry
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        //match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
        var reg = /src(.*)\/index\.js/
        const match = entryFile.match(/src\/(.*)\/index\.js/)//[ 'src/search/index.js','/search',index: 36,input: '/Users/wumao/学习/webpack/my-project1/src/search/index.js',groups: undefined ]
        const pageName = match && match[1];
        console.log("match",match)
        console.log("pageName",pageName)
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({//html压缩
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
                chunks: [pageName],//文件要引入的js
                inject: true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
                minify: {//控制是否以及以何种方式缩小输出
                    // html5: true,
                    preserveLineBreaks: false,//保留换行符
                    collapseWhitespace: true,//折叠空白
                    removeComments: false,//删除注释：true，
                    // minifyCSS: true,
                    // minifyJS: true,
                    // removeRedundantAttributes: true,//删除冗余属性：true，
                    // removeScriptTypeAttributes: true,//删除脚本类型属性：true，
                    // removeStyleLinkTypeAttributes: true,//删除样式链接类型属性：true，
                    // useShortDoctype: true//使用短文档类型：true
                }
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const {entry, htmlWebpackPlugins} = setMPA()
module.exports = {
    entry:entry,
    output:{
        path: path.join(__dirname, "dist"),
        filename: "[name]_[hash:8].js"//js使用chunkhash设置
    },
    module:{
        rules:[
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
              test:/\.(svg|png|gif|jpeg|jpg)/,
              use:[
                  {
                      loader:"url-loader",
                      options:{
                          limit:10240
                      }
                  }
              ]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
                use:"file-loader"
            }
        ]
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'//css使用contenthash设置
        }),
        new OptimizeCssAssetsWebpackPlugin({//css压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
    ].concat(htmlWebpackPlugins),
    devServer:{
        contentBase:"./dist",//deveServe基础目录
        hot:true,
        stats:"errors-only"
    },
    // mode:'production'
    mode:'development',//热更新只在开发环境使用所以暂时改成development
    // devtool:'cheap-source-map'
}