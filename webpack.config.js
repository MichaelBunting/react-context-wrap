const path = require('path');

module.exports = (env = {}) => ({
  entry: './src/react-context-wrap',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'react-context-wrap',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
    },
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'react',
    },
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
  },
});
