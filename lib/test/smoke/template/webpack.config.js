const path = require('path')
const Webpack = require('webpack')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry:{app:"./src/index.js",app1:"./src/index.js"},
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name][chunkhash:8].js"//js使用chunkhash设置

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
                    {//内联css
                        loader:'style-loader',
                        options:{
                            insertAt:'top',//样式插入到head
                            singleton:true//将所有的style标签合并成一个
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    {//内联css
                        loader:'style-loader',
                        options:{
                            insertAt:'top',//样式插入到head
                            singleton:true//将所有的style标签合并成一个
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|gif|jpg|jpeg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'[]img/[name][hash:8].[ext]'//设置file-loader的name使用[hash]
                    }
                }]
            },
            // {
            //   test:/\.(svg|png|gif|jpeg|jpg)/,
            //   use:[
            //       {
            //           loader:"url-loader",
            //           options:{
            //               limit:10240
            //           }
            //       }
            //   ]
            // },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
                use:"file-loader"
            }
        ]
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash:8].css'//css使用contenthash设置
        })
    ],
    devServer:{
        contentBase:"./dist",//deveServe基础目录
        hot:true
    },
    // mode:'production'
    mode:'development'//热更新只在开发环境使用所以暂时改成development
}