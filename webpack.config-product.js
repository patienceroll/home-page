const path = require('path');
const LoaderUtils = require('loader-utils');
const Webpack = require('webpack');

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
    // chunkFilename: FileNameType + '.js',
    chunkFilename: '[name]-[contenthash:8].js',
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
    // // 删除dist
    new CleanWebpackPlugin({}),
    // 输出 index.html 文件
    new HtmlWebpackPlugin({
      template: 'public/index.html',
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
    isAnalyse ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : [],
  ),

  optimization: {
    splitChunks: {
      minChunks: 2,
      cacheGroups: {
        // 抽离出 react、react-dom
        react: {
          name: 'react~vender',
          test: /[\\/]node_modules[\\/]react/,
          chunks: 'all',
          enforce: true,
          priority: 10,
          reuseExistingChunk: true,
        },
        // 抽离出 node_module 插件
        venders: {
          name: 'venders',
          test: /[\\/]node_modules/,
          chunks: 'all',
          enforce: true,
          priority: 2,
          reuseExistingChunk: true,
        },
        // 抽离出公用的业务代码
        common: {
          name: 'common~venders',
          chunks: 'all',
          minChunks: 2,
          priority: 1,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
