var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // instead of css split by module, bundles all css into one file

var BUILD_DIR = path.resolve(__dirname, 'build/public/assets');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    target: 'web',
    entry: SRC_DIR + '/client/index.es6',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.es6?/,
                include : SRC_DIR,
                loader : 'babel-loader'
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            // },
            // this now outputs all the same files as webpack.server-config.js,
            // except the .jpg referenced by css has its path calculated by server-config
            // there shouldn't be a need to duplicate this output
            // the settings here (instead of webpack.server-config) determine path Webpack uses in React components
            // here, publicPath is prepended to the image file path as rendered
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?publicPath=assets/&name=img/[name]-[hash:6].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    // see https://github.com/FormidableLabs/radium/issues/575
    // not sure why the build was getting two versions of radium (in the github issue, the problem was in a library consumed by another app that also depended on radium)
    resolve: {
        alias: {
            radium: path.join(__dirname, 'node_modules', 'radium')
        }
    }
};

module.exports = config;