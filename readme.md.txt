## 玩转webpack

### 一,webpack核心概念：

目的：快速复用组件

##### 常见的模块化方式

ES6：import * as largeNumber from "largeNumber"

commonJS: const largeNumber = require("large-number")

AMD:require(['large-number'],function(){})

   #### 1.1为什么需要构建工具？

 	转换ES6语法

​     转换JSX

​     css前缀不全/预处理器

 	压缩混淆

 	图片压缩

#### 1.2初识webpack

![image-20200521145239889](/Users/wumao/Library/Application Support/typora-user-images/image-20200521145239889.png)

````
在webpack.config.js中分别打印：
__dirname(文件路径): /Users/wumao/学习/webpack/my-project1 
__filename(当前文件): /Users/wumao/学习/webpack/my-project1/webpack.config.js

````



```
path.join:
	把路径片段使用特定的分隔符（\）连接起来形成路径
	
const path = require('path');
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3=path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
 
  
console.log(__dirname);    //E:\test       
console.log(myPath);    //E:\test\img\so
console.log(myPath2);   //E:\test
console.log(myPath3);


```

#### 1.3运行webpack

![image-20200605165248606](/Users/wumao/Library/Application Support/typora-user-images/image-20200605165248606.png)

在scripts里面运行webpack，会创建一个软连接，在node_modules/.bin目录中寻找webpack

#### 1.4 entry和output

1.4.1 单入口：entry:"./src/index"

​		 多入口：entry:{app:"./src/index",app1: "./src/index1}

​         单入口output的文件名称可以写死，但是多入口，output的文件名称需要用[name]占位符占位

```javascript
const path = require('path')
module.exports = {
    entry:{app:"./src/index.js",app1:search.index.js},
  	output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"

    },
    mode:'production'
}
```

#### 1.5 loaders

  通过loaders支持原本webpack不支持的类型 ,解析webpack本来不支持的文件。

  loaders：本身是一个函数，接收源代码作为参数，返回通过loaders转换之后的结果

  常用的loader:

|     名称      | 描述                     |
| :-----------: | ------------------------ |
| Bable-loader  | 转换es6，es7等新型js语法 |
|  Css-loader   | 支持.css文件的加载和解析 |
| le s s-loader | 将less文件转换成css文件  |
|   ts-loader   | 将ts转换成js             |
|  File-loader  | 进行图片，字体等的打包   |
|  ra w-loader  | 将文件以字符串的形式导入 |
| thread-loader | 多进程打包js和css        |

​	loaders的配置，放在根结点下面的module对象中的rules数组中：

```javascript
const path = require('path')
module.exports = {
    entry:{app:"./src/index.js",app1:"./src/index1.jsearch.jsoutput:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"

    },
    modules:{
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },

        ]
    },
    mode:'production'
}
```

#### 1.6plugins

插件用于bundle文件的优化，资源管理和环境变量注入，作用于整个构建过程。

##### 1.6.1常用的plugins插件

|           名称           |                  描述                  |
| :----------------------: | :------------------------------------: |
|    CommonsChunkPlugin    |   将chunks相同的模块代码提取成公共js   |
|    CleanWebpackPlugin    |              清理构建目录              |
| ExtractTextWebpackPlugin | 将css从bundle文件里提取成一个独立的css |
|    CopyWebpackPlugin     |   将文件或文件夹拷贝到构建的输出目录   |
|    HtmlWebpackPlugin     |   创建html文件去承载输出的bundle文件   |
|  UglifyjsWebpackPlugin   |                 压缩js                 |
|     ZipWebpackPlugin     |      将打包出的资源生成一个zip包       |

##### 1.6.2使用

将定义好的plugin放到plugins数组中

```javascript
const path = require('path')
module.exports = {
    entry:{app:"./src/index.js",app1:index.js},
		output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"

    },
    modules:{
        rules:[
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            // },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            // },

        ]
    },
    plugins:[
        newHtmlWebpackPlugin({template:"./src/index.html"})
    ],
    mode:'production'
}
console.log(__dirname)
console.log(__filename)
```

#### 1.7mode(webpack4提出的新概念)

mode可以指定当前的构建环境是：production（生产），development（开发），还是none

设置mode可以使用webpack的内置函数，默认值为production

### 二webpack解析

 #### 2.1解析es6,react-JSX：webpack.config.js

  使用babel-loader

```javascript
const path = require('path')
module.exports = {
    entry:{app:"./src/index.js",app1:"./src/index1.js"},
		output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"


    },
    modules:{
        rules:[
            {//解析es6
                test: /\.js$/,
                use: 'babel-loader',
            },{
            	  test:/\.jsx$/,
            	  use:'bable'
            }
        ]
    },
    plugins:[
        newHtmlWebpackPlugin({template:"./src/index.html"})
    ],
    mode:'production'
}
```

babel的配置文件是：.babelrc  

```json
{
  "presets": [
    "@babel/preset-env",//解析es6
    "@babel/preste-react"//解析react
  ]
}
```

#### 2.2 解析css，less:webpack.config.js

c s s-loader用来加载.css文件，并且转换成commonjs对象

<u>style-loader将样式用style标签加入到页面中去</u>

loader的执行从右到左，先写style-loader，再写css-loader，实际上先执行css-loader，然后再执行style-loader，将解析好的css，加入到style中去

```javascript
const path = require('path')
module.exports = {
    entry:{app:"./src/index.js",app1:"./src/index1.js"},
		output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"

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
            {//解析less
                test:/.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    mode:'production'
}
```

#### 2.3 解析图片,解析字体:webpack.config.js

url-loader和file-loader都可以解析图片和字体，但是urk-loader可以设置自动将较小的图片base64

```javascript
const path = require('path')
module.exports = {
    entry:{app:"./src/index.js",app1:"./src/index1.js"},
		output:{
        path:path.join(__dirname,"dist"),
        filename:"[name].js"

    },
    module:{
        rules:[
            {
                test:/\.(png|gif|jpg|jpeg)$/,
                use:"file-loader"
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
                use:"file-loader"
            }
        ]
    },
    mode:'production'
}
```

#### 2.4webpack文件监听（热更新）

##### 2.4.1Package.json文件：npm run watch可以实现热更新

```json
{
  "name": "my-project1",
  "version": "1.0.0",
  "description": "webpack study",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"
  },
  "author": "wumao",
  "license": "ISC",
  "devDependencies": {
    "@babel/preset-react": "^7.10.1",
    "babel-loader": "^8.1.0",
    "css-loader": "^3.5.3",
    "file-loader": "^6.0.0",
    "less": "^3.11.3",
    "less-loader": "^6.1.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  }
}
```

Web pack-dve-serve(WDS):

WDS不能刷新浏览器，需要与HotModuleReplacementPlugin（webpack内置插件）一起使用，WDS不输出文件到磁盘中，而是保存到内存里面，所以比--watch要快。

```json
{
  "name": "my-project1",
  "version": "1.0.0",
  "description": "webpack study",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch",
    "dev": "webpack-dev-server --open"
  },
  "author": "wumao",
  "license": "ISC",
  "devDependencies": {
    "@babel/preset-react": "^7.10.1",
    "babel-loader": "^8.1.0",
    "css-loader": "^3.5.3",
    "file-loader": "^6.0.0",
    "less": "^3.11.3",
    "less-loader": "^6.1.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  }
}
```

##### 2.4.2热更新的原理：

webpack compile:将js编译成bundle.( 注解：webpack编辑器将js编译打包输出bundle.js)

HMR server: 将热更新的文件输出给HMR runtime

Bundle server:提供文件在浏览器的访问，将文件目录访问的形式（[http://localhost:63342/%E5%AD%A6%E4%B9%A0/webpack/my-project1/dist/index.html?_ijt=osldniuaa85e59phi5lmj35nbi](http://localhost:63342/学习/webpack/my-project1/dist/index.html?_ijt=osldniuaa85e59phi5lmj35nbi)）改为服务器的访问形式(http://localhost:8080/index.html)

HMR runtime:在开发打包阶段，会被注入到浏览器中的bundle.js中，使浏览器端的bundle.js和服务器建立连接(通常这个链接是一个webscoket),更新文件变化。

注：bundle.js:构建输出的文件

##### 2.4.3热更新流程图：

![未命名文件](/Users/wumao/Downloads/未命名文件.png)

##### 2.4.4文件指纹（打包输出的文件名后缀）：

 a:文件指纹如何生成？

Hash:和整个项目的构建有关，只要项目文件有修改，整个项目的hash值就会有修改

ChunkHash:和webpack打包的chunk（模块）有关，不同的entry会生成不同的chunkhash值,不能与热更新一起使用

ContentHash:根据文件内容来定义hash，文件内容不变，则contenthash不变

b:文件指纹设置

```javascript
const path = require('path')
const Webpack = require('webpack')
module.exports = {
    entry:{app:"./src/index.js",app1:index.js},
		output:{
  			path:path.join(__dirname,"dist"),
        filename:"[name]_[chunkhash:8].js"//js使用chunkhash设置,:8代表文件指纹长度

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
                test:/\.(png|gif|jpg|jpeg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'[]img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash]
                    }
                }]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
							  use:[{
                    loader:'file-loader',
                    options:{
                        name:'[]img/[name]_[hash:8].[ext]'//字体 的文件指纹，设置file-loader的name使用[hash]
                    }
                }]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap  
            filename: '[name]_[contenthash:8].css'//css使用contenthash设置
        })
    ],
    mode:'production'
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
}
```

![image-20200617113436525](/Users/wumao/Library/Application Support/typora-user-images/image-20200617113436525.png)

​        

##### 2.4.5 html,css,js代码压缩

```javascript
const path = require('path')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//webpack4使用optimize-css-assets-webpack-plugin压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')//html压缩
module.exports = {
    entry:{app:"./src/index.js",app1:"./src/index1.js"},
		output:{
  			path:path.join(__dirname,"dist"),
        filename:"[name]_[chunkhash:8].js"//js使用chunkhash设置

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
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|gif|jpg|jpeg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash],打包到img目录下
                    }
                }]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
                use:"file-loader"
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'//css使用contenthash设置
        }),
        new OptimizeCssAssetsWebpackPlugin({//css压缩
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
        }),
        new HtmlWebpackPlugin({//html压缩
            template:path.join(__dirname,'src/index.html'),
            filename:'index.html',//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
            chunks:['index'],
            inject:true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
            minify:{//控制是否以及以何种方式缩小输出
                html5:true,
                preserveLineBreaks:false,//保留换行符
                collapseWhitespace: true,//折叠空白
                removeComments: false,//删除注释：true，
                minifyCSS:true,
                minifyJS:true,
                // removeRedundantAttributes: true,//删除冗余属性：true，
                // removeScriptTypeAttributes: true,//删除脚本类型属性：true，
                // removeStyleLinkTypeAttributes: true,//删除样式链接类型属性：true，
                // useShortDoctype: true//使用短文档类型：true
            }
        })
    ],
    mode:'production'//webpack4 当mode设置为production的时候，默认开启了uglifyjs插件压缩js
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
}
```

##### 2.4.6自动清理构建目录

```javascript
const path = require('path')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//webpack4使用optimize-css-assets-webpack-plugin压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')//html压缩
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//清理构建目录
module.exports = {
    entry:{index:"./src/index.js",search:index.jindex.js代表文件打包之后的文件名称
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name]_[chunkhash:8].js"//js使用chunkhash设置

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
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|gif|jpg|jpeg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash],打包到img目录下
                    }
                }]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
                use:"file-loader"
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'//css使用contenthash设置
        }),
        new OptimizeCssAssetsWebpackPlugin({//css压缩
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
        }),
        new HtmlWebpackPlugin({//html压缩
            template:path.join(__dirname,'src/index.html'),
            filename:'index.html',//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
            chunks:['index'],//文件要引入的js
            inject:true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
            minify:{//控制是否以及以何种方式缩小输出
                html5:true,
                preserveLineBreaks:false,//保留换行符
                collapseWhitespace: true,//折叠空白
                removeComments: false,//删除注释：true，
                minifyCSS:true,
                minifyJS:true,
                // removeRedundantAttributes: true,//删除冗余属性：true，
                // removeScriptTypeAttributes: true,//删除脚本类型属性：true，
                // removeStyleLinkTypeAttributes: true,//删除样式链接类型属性：true，
                // useShortDoctype: true//使用短文档类型：true
            }
        }),
        new HtmlWebpackPlugin({//html压缩
            template:path.join(__dirname,index.html),
            filename:'search.html',//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
            chunks:['search'],//文件要引入的js
            inject:true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
            minify:{//控制是否以及以何种方式缩小输出
                html5:true,
                preserveLineBreaks:false,//保留换行符
                collapseWhitespace: true,//折叠空白
                removeComments: false,//删除注释：true，
                minifyCSS:true,
                minifyJS:true,
                // removeRedundantAttributes: true,//删除冗余属性：true，
                // removeScriptTypeAttributes: true,//删除脚本类型属性：true，
                // removeStyleLinkTypeAttributes: true,//删除样式链接类型属性：true，
                // useShortDoctype: true//使用短文档类型：true
            }
        }),
        new CleanWebpackPlugin()//会清理旧的构建内容，不会使文件增多
    ],
    mode:'production'//webpack4 当mode设置为production的时候，默认开启了uglifyjs插件压缩js
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
}
```

##### 2.4.7POSTCSS插件autoprefixer自动补全css前缀

Webpack4-postcss-autoprefixer配置警告：Replace Autoprefixer browsers option to Browserslist config. Use browserslis 巴拉巴拉。。。，解决办法：http://www.manongjc.com/detail/15-aznzmcuevjzkgwi.html

​	举个栗子：

```css
.box{
  -moz-border-radius:10px;
  -webkit-border-radius:10px;
  -o-border-radius:10px;
  border-radius:10px;
}
```

Less,scss:为css的预处理器。autoprefixer:为webpack的后置处理器。

```
sudo cnpm i postcss-loader autoprefixer -D
```

```javascript
const path = require('path')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//webpack4使用optimize-css-assets-webpack-plugin压缩css
const HtmlWebpackPlugin = require('html-webpack-plugin')//html压缩
const {CleanWebpackPlugin} = require('clean-webpack-plugin')//清理构建目录
module.exports = {
    entry:{index:"./src/index.js",search:index.js},//key值index.js文件名称
    output:{
        path:path.join(__dirname,"dist"),
        filename:"[name]_[chunkhash:8].js"//js使用chunkhash设置

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
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader:"postcss-loader",
                        options: {
                            plugins:()=>[
                                require('autoprefixer')({//指定兼容浏览器最新的两个版本，版本使用人数》1%
                                    browsers:['last 2 version','>1%','ios 7']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.(png|gif|jpg|jpeg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash],打包到img目录下
                    }
                }]
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)/,
                use:"file-loader"
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'//css使用contenthash设置
        }),
        new OptimizeCssAssetsWebpackPlugin({//css压缩
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
        }),
        new HtmlWebpackPlugin({//html压缩
            template:path.join(__dirname,'src/index.html'),
            filename:'index.html',//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
            chunks:['index'],//文件要引入的js
            inject:true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
            minify:{//控制是否以及以何种方式缩小输出
                html5:true,
                preserveLineBreaks:false,//保留换行符
                collapseWhitespace: true,//折叠空白
                removeComments: false,//删除注释：true，
                minifyCSS:true,
                minifyJS:true,
                // removeRedundantAttributes: true,//删除冗余属性：true，
                // removeScriptTypeAttributes: true,//删除脚本类型属性：true，
                // removeStyleLinkTypeAttributes: true,//删除样式链接类型属性：true，
                // useShortDoctype: true//使用短文档类型：true
            }
        }),
        new HtmlWebpackPlugin({//html压缩
            template:path.join(__dirname,index.html),
            filename:'search.html',//要将HTML写入的文件。默认为index.html索引. 您也可以在这里指定子目录（例如：assets/管理.html)
            chunks:['search'],//文件要引入的js
            inject:true,//true | |“head”| |“body”| | false将所有资产注入给定的模板或模板内容。当传递true或body时，所有javascript资源都将放在body元素的底部head'将脚本放在head元素中-请参见注入：错误示例
            minify:{//控制是否以及以何种方式缩小输出
                html5:true,
                preserveLineBreaks:false,//保留换行符
                collapseWhitespace: true,//折叠空白
                removeComments: false,//删除注释：true，
                minifyCSS:true,
                minifyJS:true,
                // removeRedundantAttributes: true,//删除冗余属性：true，
                // removeScriptTypeAttributes: true,//删除脚本类型属性：true，
                // removeStyleLinkTypeAttributes: true,//删除样式链接类型属性：true，
                // useShortDoctype: true//使用短文档类型：true
            }
        }),
        new CleanWebpackPlugin()//会清理旧的构建内容，不会使文件增多
    ],
    mode:'production'//webpack4 当mode设置为production的时候，默认开启了uglifyjs插件压缩js
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
}
```

autoprefixer之前：

```css
.wd500{width:500px}.wd500 .bgred{background-color:#639}.box{font-size:100px;color:red;display:flex}
```

autoprefixer之后：

```css
.wd500{width:500px}.wd500 .bgred{background-color:#639}.box{font-size:100px;color:red;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}
```

##### 2.4.8移动端css 自动转换rem

rem是相对单位。px是绝对单位。

使用px2rem-loader.（npm i px2rem-loader -D）

页面渲染时，计算根元素的font-size值:使用lib-flexible(npm i lib-flexible -S)

```javascript
            {
                test:/.less$/,
                use:[
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader:"postcss-loader",
                        options: {
                            plugins:()=>[
                                require('autoprefixer')({//指定兼容浏览器最新的两个版本，版本使用人数》1%
                                    browsers:['last 2 version','>1%','ios 7']
                                })
                            ]
                        }
                    },{
                        loader:'px2rem-loader',
                        options:{
                            remUnit:75,//1rem=75px
                            remPrecesion:8//px转换成rem的小数点位数
                        }
                    }
                ]
            },

```

##### 2.4.9静态资源内联

资源内联的意义：

​	代码层面：页面框架的初始化脚本，上报相关打点，css内避免页面闪动

​	请求层面：减少http网络请求数（小图片或者字体内联url-loader）

HTML和JS内联：使用raw-loader内联html。

Raw-loader内联html:

```
<script>$(require('raw-loader|babel-loader!./meta.html'))
```

raw-loader内联JS：

```
<script>$(require('raw-loader|babel-loader!../node_modules/lib-flexible'))</script>
```

css内联：

方案一：借助style-loader

```
module:{
    rules:[
        {
            test: /.js$/,
            use: 'babel-loader'
        },
        {
            test:/.css$/,
            use:[
                // 'style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test:/.less$/,
            use:[
                // 'style-loader',
                //MiniCssExtractPlugin.loader,
                {
                 loader:'style-loader',
                 options:{
                     insertAt:'top',//样式插入到head
                     singleton:true,//将所有的style标签合并成一个
                 }
                },
                'css-loader',
                'less-loader',
                {
                    loader:"postcss-loader",
                    options: {
                        plugins:()=>[
                            require('autoprefixer')({//指定兼容浏览器最新的两个版本，版本使用人数》1%
                                browsers:['last 2 version','>1%','ios 7']
                            })
                        ]
                    }
                },{
                    loader:'px2rem-loader',
                    options:{
                        remUnit:75,//1rem=75px
                        remPrecesion:8//px转换成rem的小数点位数
                    }
                }
            ]
        },
        {
            test:/\.(png|gif|jpg|jpeg)$/,
            use:[{
                loader:'file-loader',
                options:{
                    name:'img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash],打包到img目录下
                }
            }]
        },
        {
            test:/.(woff|woff2|eot|ttf|otf)/,
            use:"file-loader"
        }
    ]
},
```

方案二：html-inline-css-webpack-plugin

##### 2.5.0多页面打包通用方案（动态支持多页面打包）

动态获取entry和设置html-webpack-plugin数量

利用glob.sync : https://www.npmjs.com/package/glob

a:将目录下的文件名称改为index

![image-20200724155740907](/Users/wumao/Library/Application Support/typora-user-images/image-20200724155740907.png)

b:步骤：

npm i glob

```
const glob = require('glob')
```

```
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
                    html5: true,
                    preserveLineBreaks: false,//保留换行符
                    collapseWhitespace: true,//折叠空白
                    removeComments: false,//删除注释：true，
                    minifyCSS: true,
                    minifyJS: true,
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
console.log("entry",entry)
module.exports = {
    entry:entry,
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
                use: 'babel-loader'
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
                }]
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
        new CleanWebpackPlugin()//会清理旧的构建内容，不会使文件增多
    ].concat(htmlWebpackPlugins),//.concat(htmlWebpackPlugins)
    mode: 'production'//webpack4 当mode设置为production的时候，默认开启了uglifyjs插件压缩js
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
}
```

##### 2.5.1使用sourcemap定位到源代码

**什么是Source map**

简单说，Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

（一般在开发环境用，线上排查问题的时候使用）

eval：使用eval保国模块代码

source map:产生.map文件

cheap：不包含列信息

inline：将.map作为dataurl嵌入，不单独生成.map文件

module：包含loader的source map

```
devtool:"source-map",
```

##### 2.5.2提取页面公共资源

思路：

方法1：使用html-webpack-externals-plugin，将react react-dom基础包通过cdn引入，不打入bundle中

```JavaScriptj a
new HtmlWebpackExternalsPlugin({
    externals:[
        {
            module:'react',
            entry:'https://unpkg.com/react@16/umd/react.development.js',
            global:"React"
        },
        {
            module:'react-dom',
            entry:'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
            global:"ReactDOM"
        }
    ]
})
```

方法2:利用SplitChunksPlugin进行公共脚本分离（webpack4内置的，替代commonsChunkPlugin插件）

chunks参数说明：

​	async ：异步引入的库进行分离（默认）

​    initial：同步引入的库进行分离

​    all：所有引入的库进行分离（推荐 ）

```
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
```

##### 2.5.3tree shaking(摇树优化)

概念：一个模块可能有多个方法，只要其中的方法是用到了，则整个文件都被打包到bundle里面去，tree shaking就是只把用到的方法打入bundle，没用到的方法会在uglify阶段被擦除掉。

当webpack设置model为productin时，默认开启tree shaking

使用方法：webpack默认支持，在.babelrc里设置modules:false就可以了

##### 2.5.4 ScopeHoisting使用原理和分析

现象：构建打包后的代码存在大量闭包代码（如下），大量函数闭包包过代码，导致体积增大，运行代码时创建的函数作用域变多，内存开销变大

```
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return b; });
function a() {
  return 'this is fun a';
}
function b() {
  return 'this is fun b';
}

/***/ }),
```

ScopeHoisting原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

使用：webpack4设置mode为production时，默认开启 ModuleConcatenationPlugin 插件，使用ScopeHoisting特性

##### 2.5.5代码分割和动态import

代码分割实用场景：1抽离相同代码到一个共享块   2 脚本懒加载，使初始下载的代码更小

懒加载js脚本的方式：1CommonJS:require.ensure. 2 ES6:动态import（目前还没有原声支持，需要babel转换）

1⃣️安装@babel/plugin-syntax-dynamic-import插件

2⃣️配置.babelrc文件

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

##### 2.5.6webpack和eslint结合

使用eslint-loader,构建时检查js规范 

```
sudo cnpm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-config-airbnb --save-dev
```

```
sudo cnpm i eslint-loader --save-dev
```

```
{
    test: /.js$/,
    use: ['babel-loader','eslint-loader']
},
```

##### 2.5.7webpack实现ssr打包

服务端渲染（ssr）的核心是减少请求，server收到请求之后会吧html和data渲染一起返回。

```
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
```

##### 2.5.8 优化构建时命令行现的显示日志

统计信息stats

|               |       |                                |
| ------------- | ----- | ------------------------------ |
| “Errors-only” | none  | 只在发生错误时输出             |
| “minimal”     | none  | 只在发生错误或有你的编译时输出 |
| none          | false | 没有输出                       |
| normal        | true  | 标准输出                       |
| verbose       | none  | 全部输出                       |

生产环境直接设置：stats:"errors-only"

开发环境需要设置：

```
devServer:{
    contentBase:"./dist",//deveServe基础目录
    hot:true,
    stats:"errors-only"
},
```

webpack友好错误提示插件：friendly-errors-webpack-plugin

​	可以识别某些类别的webpack错误，并清理聚合和优先级，以提供更好的开发人员体验

##### 2.5.9构建异常和中断处理

如何判断构建是否成功？

在CI/CD的pipline或者发布系统需要知道当前构建状态

每次构建完成后输入echo$?获取错误码

```
new FriendlyErrorsWebpackPlugin(),
function(){
    //this指向compile
    this.hooks.done.tap('done',(stats)=>{
        if(stats.compilation.errors&&stats.compilation.errors.length&&process.argv.indexOf('--watch')==-1){
            console.log('build error')
            process.exit(14)
        }
    })
}
```

##### 2.6.0构建配置包设计

构建配置抽离成npm包的意义

通用性：

​	业务开发者无需关注配置构建

​	统一团队构建脚本

可维护性：

​	构建配置合理的拆分

​	REAMDEME文档，ChangeLog文档等

质量：

​	冒烟测试，单元测试，测试覆盖率

##### 2.6.1功能模块设计和目录结构

> ![构建包功能设计](/Users/wumao/Downloads/构建包功能设计.png)

![image-20200904170446573](/Users/wumao/Library/Application Support/typora-user-images/image-20200904170446573.png)

##### 2.6.2冒烟测试

*构建是否成功

*每次构建完成build目录是否有内容输出

```
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
```

​	是否有JS，CSS等静态资源文件

​	是否有HTML文件             

```
const glob = require('glob-all')

describe('Checking generated html files',()=>{
    it('should generate html files',(done)=>{
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html'
        ])
    })
    if(files.length > 0){
        done()
    }else{
        throw new Error('no html files generate')
    }
})
```

##### 2.6.3单元测试与测试覆盖率

单纯的测试框架：mocha   ava，如果 需要断言库：1chai 2 should.js  3expect  4better-assert

集成框架：jasmine  Jest

以mocha  chai为例，编写单元测试用例：

技术选型：Mocha + Chai

测试代码：describe，it，except

测试命令：mocha，add.test.js

###### 单元测试接入

1.安装mocha + chai

```Nom i mocha chai -D```

2.新建test目录，并增加XXX.test.js

3.在package.json中的scripts字段增加test命令

```
"scripts":{
	"test":"node_modules/mocha/bin/_mocha"
}
```

4.执行测试命令

​	npm run test



![image-20200909171700539](/Users/wumao/Library/Application Support/typora-user-images/image-20200909171700539.png)

Index.js:

```
const path = require('path')

process.chdir(path.join(__dirname,'smoke/template'))


describe('builder-webpacl test care',()=>{
     require('./unit/webpack-base-test')
})
```



Web pack.base.js:

```
const assert = require('assert')
describe('webpack.base.js test case',()=>{

    const baseConfig = require('../../lib/webpack.base.js')
    console.log("baseConfig",baseConfig)

    it('entry',()=>{
        assert.equal(baseConfig.entry.index,'/Users/wumao/学习/webpack/my-project1/builder-webpack/test/smoke/template/src/index/index.js')
        assert.equal(baseConfig.entry.search,'/Users/wumao/学习/webpack/my-project1/builder-webpack/test/smoke/template/src/search/index.js')
    })
})
```

​      测试覆盖率：sudo cnpm i istanbul -D

```
"scripts": {
  "test": "istanbul cover ./node_modules/.bin/_mocha"
},
```

![image-20200909180930728](/Users/wumao/Library/Application Support/typora-user-images/image-20200909180930728.png)

#####  2.6.4持续集成和travisCI

什么是持续集成？

​	持续集成是经常合并小的代码更改的实践，而不是在开发周期结束时合并大型的更改。

持续集成的作用：

​	1.帮助我们快速发现错误

​	2.防止分支大幅偏离主干

核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成

###### 2.6.4.1接入travis CI

​	1 使用github账号登陆https://travis-ci.org/ 

​    2 在https://travis-ci.org/account/repositories为项目开启

​	3项目根目录下新增 .travis.yml

​		3.1yml文件内容：

```
language:node_js

sudo:false

cache:
  apt: true
  directories:
    - node_modules

node_modules:stable

install:
  - npm install -D
  - cd ./test/smoke/template
  - npm install -D
  - cd ../../../

script:
  - npm test
 
```

##### 2.6.5发布到npm

命令行：

 npm login

 npm publish

npm version minor   修改版本的中位数（1.0.0。1.1.0。 1.2.0）

npm version patch.   修改版本的末位数（1.2.1）

##### 2.6.6git commit 规范和changelog生成

良好的git commit 规范优势：

1加快code review 流程

2根据git commit 的元数据生成changelog

3后续维护者可以知道feature呗修改的原因

##### 2.6.7语义化版本（semantic  versioning）规范格式

主版本号：当你做了不兼容的API修改

次版本号：当你做了向下兼容的功能性新增

修订号：当你做了向下兼容的问题修正 

先行版本号：

​		先行版本号可以作为发布正式版之前的版本，格式是在修订版本号后面加上一个链接号（-），再加上一连串以点（.）分割的标识符，标识符可以由英文，数字，和连接号（[0-9A-Za-z-]）组成。

1alpha：是内部测试版，一般不向外发布，会有很多bug。一般只有测试人员使用

2beta：也是测试版，这个阶段的版本会一直加入新的功能。在alpha版之后推出

3rc：release candidate 系统平台上就是发行候选版本。rc版不会再加入新的功能了，主要着重于除错

##### 2.6.7分析构建速度和构建体积

初级分析：使用webpack内置的stats（stats：构建的统计信息）

###### package.json中使用stats

“scripts”:{

​	"build:stats":"webpack --env production --json > stats.json"

}

运行npm run build:stats会生成stats.json文件

###### NodeJs中使用

```javascript
const webpack = require('webpack')
const config = require('./webpack.config.s')('production')
webpack(config,(err,stats)=>{
  if(err){
  	return console.error(err);   
  }
  if(stats.hasErrors()){
     return console.error(stats.toString("errors-only"))
  }
  console.log(stats)
})
```

##### 2.6.8速度分析

使用speed-measure-webpack-plugin ,分析整个打包总耗时，每个插件和loader的耗时情况。

```javascript
sudo npm i speed-measure-webpack-plugin --save-dev
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()
module.exports = smp.wrap({
    entry:entry,
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
                use: ['babel-loader','eslint-loader']
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
                }]
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
        new CleanWebpackPlugin(),//会清理旧的构建内容，不会使文件增多
        new FriendlyErrorsWebpackPlugin(),
        function(){
            //this指向compile
            this.hooks.done.tap('done',(stats)=>{
                if(stats.compilation.errors&&stats.compilation.errors.length&&process.argv.indexOf('--watch')==-1){
                    console.log('build error')
                    process.exit(14)
                }
            })
        }
    ].concat(htmlWebpackPlugins),//.concat(htmlWebpackPlugins)
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
    // mode:'production',
    mode: 'none',//webpack4 当mode设置为production的时候，默认开启了uglifyjs插件压缩js
    // devtool:"source-map",
    // mode:'development'//热更新只在开发环境使用所以暂时改成development
    stats:"errors-only"
})

```

运行npm run build之后，可以看到打包过程中loader和plugin的耗时：

![image-20200917164624915](/Users/wumao/Library/Application Support/typora-user-images/image-20200917164624915.png)

##### 2.6.9体积分析

webpack-bundle-analyzer:1依赖的第三方模块文件大小2业务里面的组件代码大小

```javascript
npm install webpack-bundle-analyzer –save-dev
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
 webpackConfig.plugins.push(new BundleAnalyzerPlugin())
```

运行npm run build，会在浏览器自动打开127.0.0.1:8888查看效果图：

![image-20200917180307860](/Users/wumao/Library/Application Support/typora-user-images/image-20200917180307860.png)

##### 2.7.0构建速度优化，

##### 使用高版本的webpack和Node

1.使用webpack4优化的原因：V8带来的优化（for of 替代forEach,map和set替代Object,includes替代indexOf）

2.默认使用更快的md4 hash算法替代md5

3.webpacks AST可以直接从loader传递给AST，减少解析时间

4.使用字符串方法替代正则表达式

##### 多进程多实例构建

可选方案：thread-loader,parallel-webpack,happypack

Thread-loader解析资源原理：每次webpack解析一个模块，thread-loader会将它及他的依赖分配给worker线程中 

```javascript
//模块happypack可以时间多线程（进程）来打包
//安装：npm install happypack
const happypack = require('happypack');
module:{
    rules:[
            {test:/\.js$/,
             use:'happypack/loader?id=js'
            },
        {
            test:/\.css$/,
            use:'happypack/loader?id=css'
        }
    ]
    },
    plugins: [
        new happypack({
            id:'css',
            use:['style-loader','css-loader']
        }),
        new happypack({
            id:'js',
            use:[{
                loader:'babel-loader',
                options:{
                    presets:[
                        //解析ES6和react语法
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                } 
            }]
        })
}
```

##### 多进程多实例并行压缩：

方法：1parallel-uglify-plugin插件   2uglifyjs-webpack-plugin(不支持压缩es6).  3terser-webpack-plugin

```javascript
optimization: {//通过splitChunks提取react|react-dom公共包，提取后名字叫vendors
    minimizer: [
        new TerserPlugin({
            parallel: true

        })
    ]
},
```

##### 分包：

使用DLLplugin分包:

​	新建web pack.dll.js:

```javascript
const path = require('path')
const webpack = require('webpack')


module.exports = {
    entry:{
        library:[
            'react',
            'react-dom'
        ]
    },
    output:{
        filename:'[name]_[hash].dll.js',
        path:path.join(__dirname,'build/library'),
        library:'[name]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:"[name]_[hash]",
            path:path.join(__dirname,'build/library/[name].json')
        })
    ]
}
```

​	增加script："build:dll": "webpack --config webpack.dll.js"

##### 充分利用缓存提升二次构建速度

缓存思路：babel-loader。terser-webpack-plugin.  Cache-loader/hard-source-webpack-plugin

```javascript
loader: 'babel-loader?cacheDirectory=true',
```

```javascript
new TerserPlugin({
    parallel: true,
    cache:true

})
```

##### 缩小构建目标

减少文件搜索范围：

1优化resolve.modules配置（减少模块搜索层级）

2优化resolve.mainFields配置

3优化resolve.extensions配置

4合理使用alias

```javascript
resolve:{
  alias:{
      'react':path.resolve(__dirname,'./node_modules/react/umd/react.production.min.js'),
      'react-dom':path.resolve(__dirname,'./node_modules/react-dom/umd/react-dom.production.min.js'),
  },
   extensions:['.js'],
   mainFields:['main']
},
st
```

##### 2.7.1使用webpack进行图片压缩

要求：基于node库的imagemin或者 tintpng API

使用：配置image-webpack-loader

png图片压缩的原理：

​	pngquant/tinypng：是一款png压缩器，通过将图像转换为具有alpha通道（通常比24/32位png文件小60-80%）的更高效的8位png格式，就是说将24位png文件转化为更小索引的8位图片，tinypng同时会将所有非必要的meatdata剥离掉。

```javascript
{
    test: /\.(png|gif|jpg|jpeg)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: 'img/[name]_[hash:8].[ext]'//图片的文件指纹，设置file-loader的name使用[hash],打包到img目录下
        }
    },{
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
    }]
},
```

压缩前：

![image-20200925145153056](/Users/wumao/Library/Application Support/typora-user-images/image-20200925145153056.png)

压缩后：

![image-20200925145207587](/Users/wumao/Library/Application Support/typora-user-images/image-20200925145207587.png)

  ##### 2.7.2使用treeShaking擦除无用的css

*treeshaking概念：1个模块可能用多个方法，只要其中的某个方法使用到了，则整个文件都会被打到bundle里面去， tree shaking 就是只吧用到的方法打入bundle，没用到的方法会在uglify阶段被擦除掉。

*无用的css如何删除掉？

purifyCSS:遍历代码，识别已经用到的css class

uncss：需要通过jsdom加载，所有的养生通过postCSS解析，通过document.querySelector来识别html文件不存在的选择器

*在webpack中如何使用PurifyCSS?

Purgecss-webpack-plugin和mini-css-extract-plugin配合使用

```javascript
npm i purgecss-webpack-plugin -D
// With mini-css-extract-plugin
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
 
const PATHS = {
  src: path.join(__dirname, 'src')
}
 
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),
  ]
}

```

##### 2.8体积优化策略总结

Scope Hoisting

Tree -shaking

公共资源分离

图片压缩

动态polyfill（polyfill-service原理：识别不同的user agent 下发polyfill）

#### 3webpack分析

##### 	3.1WEBPACK命令行

​	通过npm scripts运行webpack

  - 生产环境：npm run build
  - 开发环境：npm run dev

#####    3.2通过webpack直接运行

 - webpack bundle.js/entry.js

#####    3.3查找webpack入口

​	在命令行运行以上命令后，npm会让命令行工具进入node_modules\ .bin目录，查找是否存在webpack.sh或者webpack.cmd文件，如果存在就执行，如果不存在就抛出错误

**实际的入口文件是：node_modules\webpack\bin\webpack.js**

node_modules\webxpack\bin\package.js中：

![image-20201026145414306](C:\Users\流云\AppData\Roaming\Typora\typora-user-images\image-20201026145414306.png)

##### 3.4webpack入口文件分析

```javascript
1正常运行返回
	process.exitCode = 0;
2运行某个命令
	const runCommand = (command, args) => {}
    //例如：
      //Do you want to install 'webpack-cli' (yes/no):
      //当输入yes的时候会运行runcommand，其中参数‘command’为‘npm’，参数‘args’为[‘install’,'-D','webpack-cli']

3判断某个包是否安装
	const isInstalled = packageName => {}
4webpack可用的cli
    const CLIs = [
        {
            name: "webpack-cli",
            ...
        },
        {
            name: "webpack-command",
            ...
        }
    ];
5判断上面两个cli是否安装，根据安装数量进行处理
const installedClis = CLIs.filter(cli => cli.installed);

if (installedClis.length === 0) {
    
} else if (installedClis.length === 1) {
    
} else {

}
```

##### 3.5webpack-Cli文件解读

###### 3.5.1webpack-cli做了什么事情？

- 引入yargs，对命令行进行定制
- 分析命令行参数，对各个参数进行转换，组成编译配置项
- 引用webpack，根据配置项进行编译和构建

######   3.5.2 cli.js源码

```javascript
#!/usr/bin/env node

'use strict';
//使用v8的编译缓存
//v8 是一个 JIT(Just in time) 编译器。与传统的解释器一行一行执行不同的是，
//JIT 会在执行脚本前，对源码先解析（parsing）、再编译（compiling)，
//速度相比前者提升了不少。但解析和编译仍然消耗时间。能否将中间结果缓存起来呢？
// 所以 v8 在 4.2（node > 5.7.0） 时，就支持了 code caching 的功能,
//缓存中间结果，持久化到硬盘。减少二次执行的构建时间，加快脚本的整体执行速度。
require('v8-compile-cache');
//导入本地包（允许全局安装的软件包使用自身的本地安装版本）
const importLocal = require('import-local');
const runCLI = require('../lib/bootstrap');
const { yellow } = require('colorette');
const { error, success } = require('../lib/utils/logger');
const { packageExists } = require('../lib/utils/package-exists');
const { promptInstallation } = require('../lib/utils/prompt-installation');

// 首选本地安装`webpack cli`
if (importLocal(__filename)) {
    return;
}

process.title = 'webpack';
// process.argv 属性会返回一个数组，
//其中包含当 Node.js 进程被启动时传入的命令行参数。
// 第一个元素是 process.execPath。（启动 Node.js 进程的可执行文件的绝对路径名）
// 第二个元素是正被执行的 JavaScript 文件的路径。 
//其余的元素是任何额外的命令行参数。
const [, , ...rawArgs] = process.argv;
//如果安装了webpack
if (packageExists('webpack')) {
    //执行命令
    runCLI(rawArgs);
} else {
    //如果没有安装webpack。提示安装
    promptInstallation('webpack -W', () => {
        error(`It looks like ${yellow('webpack')} is not installed.`);
    })
        .then(() => {
            //如果安装成功，运行命令
            success(`${yellow('webpack')} was installed sucessfully.`);

            runCLI(rawArgs);
        })
        .catch(() => {
            error(`Action Interrupted, Please try once again or install ${yellow('webpack')} manually.`);

            process.exit(2);
        });
}

```

runCli方法：

```javascript
const runCLI = async (cliArgs) => {
    let args;
	//命令有没有在commands（cli-args.js文件的变量）中定义
    const commandIsUsed = isCommandUsed(cliArgs);
    //处理命令行
    const parsedArgs = parseArgs(cliArgs);
    if (parsedArgs.unknownArgs.includes('help') || parsedArgs.opts.help) {
        options.enabled = !cliArgs.includes('--no-color');
        helpRunner(cliArgs);
        process.exit(0);
    }

    if (parsedArgs.unknownArgs.includes('version') || parsedArgs.opts.version) {
        options.enabled = !cliArgs.includes('--no-color');
        versionRunner(cliArgs, commandIsUsed);
        process.exit(0);
    }
	//如果cliArgs在commands定义了，直接返回
    if (commandIsUsed) {
        return;
    }

    try {
        // handle the default webpack entry CLI argument, where instead
        // of doing 'webpack-cli --entry ./index.js' you can simply do
        // 'webpack-cli ./index.js'
        // if the unknown arg starts with a '-', it will be considered
        // an unknown flag rather than an entry
        let entry;
        if (parsedArgs.unknownArgs.length > 0 && !parsedArgs.unknownArgs[0].startsWith('-')) {
            if (parsedArgs.unknownArgs.length === 1) {
                entry = parsedArgs.unknownArgs[0];
            } else {
                entry = [];
                parsedArgs.unknownArgs.forEach((unknown) => {
                    if (!unknown.startsWith('-')) {
                        entry.push(unknown);
                    }
                });
            }
        } else if (parsedArgs.unknownArgs.length > 0) {
            parsedArgs.unknownArgs.forEach((unknown) => {
                logger.warn(`Unknown argument: ${unknown}`);
            });
            const args = await cliExecuter();
            const { opts } = parseArgs(args);
            await cli.run(opts, core);
            return;
        }
        const parsedArgsOpts = parsedArgs.opts;
        // Enable/Disable color on console
        options.enabled = parsedArgsOpts.color ? true : false;

        if (entry) {
            parsedArgsOpts.entry = entry;
        }

        const result = await cli.run(parsedArgsOpts, core);
        if (!result) {
            return;
        }
    } catch (err) {
        if (err.name === 'UNKNOWN_VALUE') {
            logger.error(`Parse Error (unknown argument): ${err.value}`);
            return;
        } else if (err.name === 'ALREADY_SET') {
            const argsMap = {};
            const keysToDelete = [];
            cliArgs.forEach((arg, idx) => {
                const oldMapValue = argsMap[arg];
                argsMap[arg] = {
                    value: cliArgs[idx],
                    pos: idx,
                };
                // Swap idx of overridden value
                if (oldMapValue) {
                    argsMap[arg].pos = oldMapValue.pos;
                    keysToDelete.push(idx + 1);
                }
            });
            // Filter out the value for the overridden key
            const newArgKeys = Object.keys(argsMap).filter((arg) => !keysToDelete.includes(argsMap[arg].pos));

            cliArgs = newArgKeys;
            args = argParser('', core, cliArgs);
            await cli.run(args.opts, core);
            logger.warn('\nDuplicate flags found, defaulting to last set value');
        } else {
            logger.error(err);
            return;
        }
    }
};
```

##### 3.6webpack流程

![webpack流程](D:\Awumao\my-project1\builder-webpack\webpack流程.png)

##### 3.7AST概念：

抽象语法树（absrct syntax tree 或者缩写为AST），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。

##### 3.8简易的webpack

simplepack:

##### 3,9loader的链式调用与执行顺序

demo参考：loader-order

执行顺序：从右向左(从后向前)

loader定义：其实是将一个模块导出为JavaScript函数

例如：

```javascript
module.exports = function(source){
    return source
}
```

因为webpack采用的是compose的函数组合方法，所以从右向左处理：

```javascript
//args是参数。先执行g方法，然后再把结果给f执行
compose = (f,g)=>(...args)=>{f(g(args))}
```

##### 3.10使用loader-runner高效进行loader的调试

loader-runner:

​	定义：可以在不安装webpack的情况下运行loaders

​	作用：作为webpack的依赖，webpack使用他执行loader

​				进行loader的开发和调试

demo参考：raw-loader

##### 3.11复杂的loader

###### 	loader的参数获取

- 通过loader-utils的getOPtions方法

######    实现异步loader

- 使用this.async

######    在loader中使用缓存

 - webpack中默认开启loader缓存，可以使用this.cacheable(false)关掉缓存

 - 缓存条件：loader的结果在相同的输入下有确定的输出

 - 有依赖的loader无法使用缓存

   raw-loader.js

   ```javascript
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
   ```

   

######    loader如何进行文件输出

 - 通过this.emitFile进行文件写入

   ```javascript
   const loaderUtils = require('loader-utils')
   console.log("loaderUtils",loaderUtils)
   module.exports = function(source){
           console.log('Loader a is excuted')
           //this.emitFile(文件名，输出内容)
           const url = loaderUtils.interpolateName(this,'[name].[txt]',source)
           console.log("url",url)
           this.emitFile(url,source)
           return source
   }
   ```

   最终会将入口文件index.js输出在dist目录
   

##### 3.12插件基本结构

运行环境：插件没有loader那种独立的运行环境，只能在webpack中运行

demo：my-plugin















































































































