import path from "path";
import LoaderUtils from "loader-utils";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

const FileNameType = "[name]-[contenthash:8]";

const config = {
    entry: "./src/app.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "./",
        filename: FileNameType + ".js",
        chunkFilename: FileNameType + ".js",
    },
    mode: "development",
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
                                // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
                                getLocalIdent: (
                                    context: { resourcePath: string },
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
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(png|jpg|gif)$/,
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
        // 分离出 css 文件
        new MiniCssExtractPlugin({
            filename: FileNameType + ".css",
            chunkFilename: FileNameType + ".css",
        }),
    ],

    devServer: {
        host: "127.0.0.1",
        port: 1996,
        contentBase: "./dist",
        proxy: {
            "/api/v1": {
                target: "http://gsea.top",
                changeOrigin: true,
            },
            "/upload": {
                target: "http://gsea.top",
                changeOrigin: true,
            },
        },
    },
};

export default config;
