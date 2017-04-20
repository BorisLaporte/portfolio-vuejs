//require our dependencies
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {

  entry: [
    './src/dev/js/index.js'
  ],

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name]-[hash].js',
    publicPath: './'
  },

  resolve: {
    modules: ['node_modules'],
    alias: {
      'SRC': path.resolve(__dirname, 'src/'),
      'IMG': path.resolve(__dirname, 'src/assets/img'),
      'FONT': path.resolve(__dirname, 'src/assets/font'),
      'SASS': path.resolve(__dirname, 'src/dev/sass'),
      'STORE': path.resolve(__dirname, 'src/dev/js/Store'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
      // Resolve path for ScrollMagic's GSAP plugin
      'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js')
    },
    extensions: ['*', '.js', '.vue']
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new CompressionPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        include: path.join(__dirname, './src/dev'),
        loader: 'vue-loader',
        options: {
          sourceMap: false,
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1&data=@import "./src/dev/sass/variables"',
            scss: 'vue-style-loader!css-loader!sass-loader?data=@import "./src/dev/sass/variables";'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, './src/dev'),
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        loader: 'file-loader?name=img/[name]-[hash:4].[ext]',
        include: path.join(__dirname, './src/assets/img')
      },
      {
        test: /\.(eot|svg|ttf|otf|woff2?)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        include: path.join(__dirname, './src/assets/font')
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.join(__dirname, './src/dev/sass/main')
      }
    ]
  }
}
