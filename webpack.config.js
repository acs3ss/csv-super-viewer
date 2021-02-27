// @ts-check

const copyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/**@type {import('webpack').Configuration}*/
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    https: true,
    port: 3001,
    hot: true,
    // publicPath: "https://localhost:3001/",
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: 'static' },
      ]
    }),
  ]
};
