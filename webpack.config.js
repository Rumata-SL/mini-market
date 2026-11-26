const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDev ? '[name].js' : '[name].[contenthash].js',
            publicPath: '/',
            clean: true,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {'@': path.resolve(__dirname, 'src')},
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {cacheDirectory: true},
                    },
                },
                {
                    test: /\.module\.scss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                    localIdentName: isDev
                                        ? '[name]__[local]--[hash:base64:5]'
                                        : '[hash:base64:8]',
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [path.resolve(__dirname, 'src')],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    exclude: /\.module\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [path.resolve(__dirname, 'src')],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff2?)$/,
                    type: 'asset/resource',
                    exclude: /\.svg$/i,
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
            }),
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify(process.env.API_URL || '/api'),
            }),
        ],
        devServer: {
            port: 3000,
            hot: true,
            open: true,
            historyApiFallback: true,
        },
        devtool: isDev ? 'eval-source-map' : 'source-map',
    };
};