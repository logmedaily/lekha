const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const LicenseWebpackPlugin = require('webpack-license-plugin');

module.exports = {
    entry: './lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lekha.min.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        library: 'lekha',
    },
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new CompressionPlugin(),
    ],
    resolve: {
        extensions: ['.js'],
        modules: ['lib', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
