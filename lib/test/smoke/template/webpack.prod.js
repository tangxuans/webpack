const path = require('path')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//webpack4使用optimize-css-assets-webpack-plugin压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')//html压缩
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//清理构建目录
const glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const HappyPack = require('happypack')
const ThreadLoader = require('thread-loader')
const TerserPlugin = require('terser-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src:path.join(__dirname,'src')
}
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
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({//html压缩
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
                chunks: ['vendors', pageName],//文件要引入的js
                inject: true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
                minify: {//控制是否以及以何种方式缩小输出
                    html5: true,
                    preserveLineBreaks: false,//保留换行符
                    collapseWhitespace: true,//折叠空白
                    removeComments: false,//删除注释：true，
                    minifyCSS: true,
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
module.exports = smp.wrap({
    entry: entry,
    // entry:{index:"./src/index/index.js",search:"./src/search/index.js"},//key值index.js文件名称
    // entry:glob.sync,//多页面打包通用方案
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name]_[chunkhash:8].js"//js使用chunkhash设置

    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /.js$/,
                use: [{
                    loader: 'thread-loader',
                    options: {
                        workers: 3
                    }
                }, 'babel-loader'],
                include: path.resolve('src')
                // exclude:[/*...*/],
                // use: ['babel-loader','eslint-loader']
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader",
                ]
            },
            {
                test: /.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'top',
                            injectType: 'singletonStyleTag',
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // {
                    //     loader:"postcss-loader",
                    //     options: {
                    //         plugins:()=>[
                    //             require('autoprefixer')({//指定兼容浏览器最新的两个版本，版本使用人数》1%
                    //                 browsers:['last 2 version','>1%','ios 7']
                    //             })
                    //         ]
                    //     }
                    // },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,//1rem=75px
                            remPrecesion: 8//px转换成rem的小数点位数
                        }
                    },
                    'less-loader',
                    "postcss-loader",
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash],打包到img目录下
                    }
                },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'//css使用contenthash设置
        }),
        new OptimizeCssAssetsWebpackPlugin({//css压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        new CleanWebpackPlugin(),//会清理旧的构建内容，不会使文件增多
        new FriendlyErrorsWebpackPlugin(),
        function () {
            //this指向compile
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error')
                    process.exit(14)
                }
            })
        },
        // new BundleAnalyzerPlugin(),
        new HappyPack({
            id: 'js',
            use: [{     // 将js的具体规则放置在此处
                loader: 'babel-loader?cacheDirectory=true',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }]
        }),
        // new webpack.DllReferencePlugin({
        //
        // })
    ].concat(htmlWebpackPlugins),//.concat(htmlWebpackPlugins)
    optimization: {//通过splitChunks提取react|react-dom公共包，提取后名字叫vendors
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true

            })
        ]
    },
    // mode:'production',
    mode: 'none',//webpack4 当mode设置为production的时候，默认开启了uglifyjs插件压缩js
    // devtool:"source-map",
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
        },
        extensions: ['.js'],
        mainFields: ['main']
    },
    // stats: "errors-only"
})