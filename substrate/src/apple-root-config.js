import { registerApplication, start } from "single-spa";

// 注册应用
registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import( // 远程加载模块
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  // activeWhen: ["/"],
  // activeWhen: "/"
  activeWhen: (location) => location.pathname === "/",

});

// http://localhost:3000/apple-react-project.js
registerApplication({
  name: "@single-spa/react-child-welcome",
  app: () =>
    System.import( // 远程加载模块
      // "http://localhost:3000/apple-react-project.js"
      '@apple/react'
    ),
  // activeWhen: "/react"
  // activeWhen: ["/react"],
  activeWhen: (location) => location.pathname.startsWith("/react")

});


// http://172.21.7.232:4000/js/app.js
registerApplication({
  name: "@single-spa/vue-child-welcome",
  app: () =>
    System.import( // 远程加载模块
      // http://172.21.7.232:4000/js/app.js
      '@apple/vue'
    ),
  // activeWhen: "/react"
  // activeWhen: ["/react"],
  activeWhen: (location) => location.pathname.startsWith("/vue")

});
// registerApplication({
//   name: "@apple/navbar",
//   app: () => System.import("@apple/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});

// 根模块
// 父亲应用的加载过程 9000 -》 index.ejs  -> apple-root-config.js -> 匹配路径加载资源