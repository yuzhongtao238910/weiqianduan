import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

// 子应用 必须提供的接入信息 
// 动态加载 
// 对于 single-spa 项目而言 保留接入协议 就可以接入到项目之中
export const { bootstrap, mount, unmount } = lifecycles;
