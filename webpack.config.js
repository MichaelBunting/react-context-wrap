module.exports = {
  entry: './react-context-wrapper',
  output: {
    path: __dirname,
    filename: 'index.js',
    library: 'react-context-wrapper',
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
};