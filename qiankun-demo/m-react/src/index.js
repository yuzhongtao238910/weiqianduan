import "./public-path.js"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root

function render(props) {
    const container = props?.container
    // console.log(container, 999999)
    root = ReactDOM.createRoot(
        container ? container.querySelector('#root') : document.getElementById('root')
    );
    root.render(
        <App />
    );
}
// qiankun 提供了一些标识 用于标识当前应用是否在父亲应用上被使用
if (!window.__POWERED_BY_QIANKUN__) {
    // 独立运行
    render()
}
//
// qiankun 要求应用暴露的方式是umd的格式

export async function bootstrap(props) {
    console.log("props", props)
}
export async function mount(props) {
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev, 'm-react-props');
    })
    props.setGlobalState({
        name: "water"
    });
    // 基座的容器叫做container
    console.log(props, 21)
    render(props)
}
export async function unmount(props) {
    root.unmount()
}














