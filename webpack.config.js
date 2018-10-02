const path = require("path");
const BrowserSync = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//Path é uma biblioteca nativa do node
module.exports = {
  entry: './src/js/app.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist/')
  },
  module:{
    rules:[
      {
        test: /\.(scss)$/,
        use:[
          {
              //Adiciona CSS para o DOM injetando um '<style>' tag
              loader: 'style-loader'
          },
          {
            //Interpreta @import and url() tais como 'import/require()' e resolve
            loader:'css-loader'
          },
          {
            loader: 'postcss-loader',
            options:{
              plugins: function(){
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new BrowserSync({
      // browse to http://localhost:3000/ during development,
      // ./dist directory is being served
      host: 'localhost',
      port: 3000,
      files:['./dist/*.html'],
      server: { baseDir: ['./dist'] }
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ]
}
