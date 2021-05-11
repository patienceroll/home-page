const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileNameType = '[name]-[contenthash:8]';

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, 'dev'),
    publicPath: '/',
    filename: FileNameType + '.js',
    chunkFilename: FileNameType + '.js',
  },
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
        use: ['@svgr/webpack', 'file-loader'],
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
          filter: (path) => {
            if (/index.html$/.test(path)) return false;
            return true;
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'patience',
      cdn: {
        css: [],
        js: [],
      },
    }),
    // 分离出 css 文件
    new MiniCssExtractPlugin({
      filename: FileNameType + '.css',
      chunkFilename: FileNameType + '.css',
    }),
  ],

  devServer: {
    host: '127.0.0.1',
    port: 1996,
    contentBase: 'dev',
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
