const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//webpack4使用optimize-css-assets-webpack-plugin压缩css
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const prodConfig = {
    mode:'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore.loader'

            },
            {
                test: /\.less$/,
                use: 'ignore.loader'

            },
        ]
    },
    plugins:[
        new OptimizeCssAssetsWebpackPlugin({//css压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackExternalsPlugin({
            externals:[
                {
                    module:'react',
                    entry:'https://unpkg.com/react@16/umd/react.development.js',
                    global:"React"
                },{
                    module:'react-dom',
                    entry:'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
                    global:'ReactDom'
                }
            ]
        })
    ],
    optimization:{//通过splitChunks提取react|react-dom公共包，提取后名字叫vendors
        splitChunks:{
            minSize:0,
            cacheGroups:{
                commons:{
                    test:/(react|react-dom)/ ,
                    name:'vendors',
                    chunks: 'all'
                }
            }
        }
    },
}

medule.exports = merge(baseConfig,prodConfig)