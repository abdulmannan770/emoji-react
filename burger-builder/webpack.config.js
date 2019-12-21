const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: ["./src/index.js"],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "[name]-bundled-[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css|less)$/i,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[hash:base64:5]",
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            modules: {
                                localIdentName: "[name]__[hash:base64:5]",
                            },
                            sourceMap: true
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]


};


