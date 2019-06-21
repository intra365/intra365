const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: ""
  },
  // webpack: [
  //   new MonacoWebpackPlugin({
  //     // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
  //     languages: ['json']
  //   })
  // ]
}
