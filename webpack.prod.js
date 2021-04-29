
const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin              = require('copy-webpack-plugin');
const TerserPlugin            = require("terser-webpack-plugin");


module.exports = {

    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [ 
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
    output: {
        filename: 'main.[contenthash].js',
        clean:true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                   "babel-loader",
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    minimize: false,
                    sources: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                        esModule: false,
                        name: 'assets/[name].[ext]'
                        }
                    }
                        
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns:[{
                from:'src/assets', to: 'assets/'
            }],
        }),
        
    ]
}