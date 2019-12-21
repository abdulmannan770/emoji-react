const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:'development',
    entry: ["./src/index.js"],
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
        contentBase: 'public',
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "bundled.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, 
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "./../img/[name].[ext]"
                    }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}