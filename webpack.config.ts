import { Configuration, loader } from "webpack";
import path from "path";
import LoaderUtils from "loader-utils";

const MODE = process.env.MODE as "development" | "production";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const FileNameType = "[name]-[contenthash:8]";

const config: Configuration = {
    entry: "./src/app.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "./",
        filename: FileNameType + ".js",
        chunkFilename: FileNameType + ".js",
    },
    mode: MODE,
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@public": path.resolve(__dirname, "public"),
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
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.module\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                compileType: "module",
                                getLocalIdent: (
                                    context: loader.LoaderContext,
                                    _localIdentName: string,
                                    localName: string
                                ) => {
                                    const hash = LoaderUtils.getHashDigest(
                                        Buffer.from(context.resourcePath + localName),
                                        "md5",
                                        "base64",
                                        5
                                    );
                                    return localName + "_" + hash;
                                },
                            },
                        },
                    },
                    "less-loader",
                ],
            },
            {
                test: /.(tsx|ts)$/,
                use: ["ts-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "images",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // 删除dist
        new CleanWebpackPlugin({}),
        // 输出 index.html 文件
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        // 复制文件夹
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    to: "public",
                    filter: path => {
                        if (/index.html$/.test(path)) return false;
                        return true;
                    },
                },
            ],
        }),
        // 分理出 css 文件
        new MiniCssExtractPlugin({
            filename: FileNameType + ".css",
            chunkFilename: FileNameType + ".css",
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                // 抽离出 react、react-dom
                react: {
                    name: "react~vender",
                    test: /[\\/]node_modules[\\/]react/,
                    chunks: "all",
                    enforce: true,
                    priority: 10,
                    reuseExistingChunk: true,
                },
                // 抽离出 node_module 插件
                venders: {
                    name: "venders",
                    test: /[\\/]node_modules/,
                    chunks: "all",
                    enforce: true,
                    priority: 2,
                    reuseExistingChunk: true,
                },
                // 抽离出公用的业务代码
                common: {
                    name: "common~venders",
                    chunks: "initial",
                    minChunks: 2,
                    priority: 1,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devServer: {
        host: "127.0.0.1",
        port: 1996,
        contentBase: "./dist",
    },
};

export default config;
