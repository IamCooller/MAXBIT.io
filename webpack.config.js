const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './js/custom.js',
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'custom_bundle.js'
    },

    devServer: {
        static: __dirname,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",
            inject: 'body'
        })
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    mode: 'production',

}