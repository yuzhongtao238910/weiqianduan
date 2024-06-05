const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "apple",
    projectName: "react-project",
    webpackConfigEnv,
    argv,
  });

  delete defaultConfig.externals // react react-dom就打包到当前的项目之中

  return merge(defaultConfig, {
    devServer: {
      port: 3000 // react
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
