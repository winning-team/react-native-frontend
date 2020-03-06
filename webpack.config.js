const path = require('path');

module.exports = {
  entry: 'App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'App.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
