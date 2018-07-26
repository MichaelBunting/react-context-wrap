const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {}) => ({
  entry: './react-context-wrap',
  output: {
    path: __dirname,
    filename: 'index.js',
    library: 'react-context-wrap',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'react',
            'stage-2',
          ],
        },
      },
    }],
  },
  optimization: {
    minimize: env.APP_ENV === 'production',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
          output: {
            beautify: false,
          },
        },
      }),
    ],
  },
});
