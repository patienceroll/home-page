const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  plugins: [
    // 复制文件夹
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          filter: (path) => {
            if (/index.html$/.test(path)) return false;
            return true;
          },
        },
      ],
    }),
  ],

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
