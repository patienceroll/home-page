const path = require('path');

const FileNameType = '[name]-[contenthash:8]';

module.exports = {
  entry: './src/app.tsx',
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: [/\.module\.less$/],
        use: ['css-loader', 'less-loader'],
      },
      {
        test: /\.module\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'module',
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /.(tsx|ts)$/,
        use: ['ts-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [],

  devServer: {
    host: '127.0.0.1',
    port: 1996,
    contentBase: './dist',
    proxy: {
      '/api/v1': {
        target: 'http://gsea.top',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://gsea.top',
        changeOrigin: true,
      },
    },
  },
};
