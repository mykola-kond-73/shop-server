const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const includeSubdependencies = require('datwd')

dotenv.config()

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 8888

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const fileName = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    context: path.resolve(__dirname),
    mode: process.env.NODE_ENV,
    target: 'node',
    externalsPresets: {
        node: true 
    },
    entry: './source/index.ts',
    externals: [
        nodeExternals({
            // allowlist: includeSubdependencies(
            //     [
            //         'ajv',
            //         'bcrypt',
            //         'body-parser',
            //         'buffer-crc32',
            //         'cors',
            //         'cross-env',
            //         'dotenv',
            //         'express',
            //         'express-async-handler',
            //         'express-fileupload',
            //         'express-rate-limit',
            //         'express-session',
            //         'helmet',
            //         'jsonwebtoken',
            //         'mongoose',
            //         'pm2',
            //         'swagger-ui-express',
            //         'uid2',
            //         'winston'
            //     ]
            // )
        })
    ],
    output: {
        // filename: fileName('js'),
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    optimization: optimization(),
    devServer: {
        port: PORT,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, './.env'),
                to: path.resolve(__dirname, 'build')
            },
            {
                from: path.resolve(__dirname, './ecosystem.config.js'),
                to: path.resolve(__dirname, 'build')
            }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}