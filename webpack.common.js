const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TemplatedPathPlugin = require("webpack/lib/TemplatedPathPlugin");

const dist = path.join(__dirname, "dist");
const src = "./src";

const _entries = [
    `${src}/third_party/semantic/dist/semantic.js`,
    `${src}/scripts/main.js`,
]
let entries = {}
for(let entry of _entries) entries[entry] = entry;

module.exports = {
    entry: entries,
    output: {
        filename: "./scripts/[contenthash].js",
        path: dist,
        clean: true
    },
    plugins: [
        new TemplatedPathPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new HtmlWebpackPlugin({
          template: `${src}/index.html`,
          scriptLoading: "blocking"
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "./styles/[hash].css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    process.env.NODE_ENV !== "production"
                    ? "style-loader"
                    : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    process.env.NODE_ENV !== "production"
                    ? "style-loader"
                    : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "./images/[hash][ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "./fonts/[hash][ext]"
                }
            },
        ],
    },
};