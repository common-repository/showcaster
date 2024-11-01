const path = require( 'path' );
const webpack = require("webpack");
const webpackConfig = {
    entry: [
        path.resolve( __dirname, 'resources/views/admin/themes/app.js' )
    ],
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         include: /\.min\.js$/,
    //         minimize: true,
    //         compress: {
    //             warnings: false,
    //             sequences: true,
    //             dead_code: true,
    //             conditionals: true,
    //             booleans: true,
    //             unused: true,
    //             if_return: true,
    //             join_vars: true,
    //             drop_console: true
    //         },
    //         comments: false,
    //         sourceMap: false
    //     })
    // ],
    output: {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'static' )
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                },
                exclude: /node_modules/
            },{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
};

module.exports = webpackConfig;