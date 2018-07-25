const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => ({
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
  mode: env.NODE_ENV === 'production' ? 'production' : 'development',
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
    minimizer: [
      ...(env.NODE_ENV === 'production' ? [new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
          output: {
            comments: false,
          },
        },
      })] : []),
    ],
  },
});
