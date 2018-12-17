const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
      app: './src/app.js'
 },
    output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
 },
 plugins: [
    new Dotenv()
  ],
   module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
},
node: {
   fs: "empty"
}
}
