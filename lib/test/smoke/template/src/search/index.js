// document.write("五毛的第二个入口")

// "use strict";
import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import logo from '../images/240_160.png'
import {a} from './tree-shaking'
import './index.less'
class Index extends React.Component {
    constructor(){
        super(...arguments)
        this.state = {
            Text:null
        };
    }
    loadComponent(){
        import("./text.js").then((Text)=>{
            console.log("Text",Text)
            this.setState({
                Text:new Text.default()
            })
                console.log(this.state.Text)

        }).catch((err)=>{
            console.error(err)
        })
    }
    render() {
        const funcText = a()
        return <div className='index'>search text
                    <div className='wd500'>
                        <div className='bgred'>huicwahfilusfeewafuweihuew</div>
                        <img src={logo} />
                        <img src={logo} />
                        <img src={logo} />
                        <img src={logo} />
                        <img src={logo} />
                        <div>{funcText}</div>
                        <div onClick={this.loadComponent.bind(this)}>点击懒加载脚本</div>
                        {
                            Text?Text:null
                        }
                    </div>
               </div>;
    }
}

ReactDom.render(
    <Index/>,
    document.getElementById('root')
)