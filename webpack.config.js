const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', //where bundling starts

  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, '/dist'), //where bundle go
    filename: 'bundle.js',
  },

  // eslint-disable-next-line no-undef
  mode: process.env.NODE_ENV,

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/*': 'http://localhost:3000',
    },
  },
};
