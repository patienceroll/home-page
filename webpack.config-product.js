const path = require('path');
const LoaderUtils = require('loader-utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isAnalyse = process.env.analyse === 'true';

const FileNameType = '[name]-[contenthash:8]';

module.exports = {
  entry: {
    main: './src/app.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: FileNameType + '.js',
    chunkFilename: FileNameType + '.js',
  },
  mode: 'production',
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
                getLocalIdent: (context, _localIdentName, localName) => {
                  const hash = LoaderUtils.getHashDigest(
                    Buffer.from(context.resourcePath + localName),
                    'md5',
                    'base64',
                    5,
                  );
                  return localName + '_' + hash;
                },
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
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              outputPath: 'svg',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    QMplayer: 'QMplayer',
  },
  plugins: [
    // // 删除dist
    new CleanWebpackPlugin({}),
    // 输出 index.html 文件
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'patience',
      cdn: {
        css: [],
        js: [
          'https://unpkg.com/react@17/umd/react.production.min.js',
          'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
          'https://cdn.bootcdn.net/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js',
          'https://y.gtimg.cn/music/h5/player/player.js?max_age=2592000',
        ],
      },
    }),
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
    // 分离出 css 文件
    new MiniCssExtractPlugin({
      filename: FileNameType + '.css',
      chunkFilename: FileNameType + '.css',
    }),
  ].concat(
    // 分析包
    isAnalyse ? new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }) : [],
  ),

  optimization: {
    splitChunks: {},
  },
};
