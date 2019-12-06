// This library allows us to combine paths easily
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
   entry: path.resolve(__dirname, 'src', 'index.jsx'),
   output: {
      path: path.resolve(__dirname, '../resources/public/output'),
      filename: 'bundle.js'
   },
   plugins: [
     new CopyPlugin([
       { from: 'src/index.html', to: '../' },
     ]),
   ],
   resolve: {
      extensions: ['.js', '.jsx', '.min.css']
   },
   module: {
      rules: [
         {
             test: /\.jsx/,
             use: {
                loader: 'babel-loader',
                options: { presets: ['react', 'es2015'] }
             }
         },
         {
            test: /\.scss/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         }
      ]
   },
   devServer: {
     contentBase: './src',
     publicPath: '/output',
     port: 9090
   }
};
