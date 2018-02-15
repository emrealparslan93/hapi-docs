const Webpack = require('webpack')
const Merge = require('webpack-merge')
const Path = require('path')
const common = require('./webpack.common.js')

module.exports = Merge(common, {
    entry: {
        app: ['webpack-hot-middleware/client', './template/js/app.js', './template/scss/app.scss']
    },
    resolve: {
        modules: [Path.join(__dirname, '../node_modules'), 'node_modules']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    emitWarning: true
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader', 'import-glob-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        js: {
                            loader: 'babel-loader'
                        },
                        scss: {
                            loader: 'vue-style-loader!css-loader!sass-loader'
                        },
                        css: {
                            loader: 'vue-style-loader!css-loader'
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval'
})
