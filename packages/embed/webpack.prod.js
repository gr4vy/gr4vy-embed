// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [`style-loader`, `css-loader`],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        exclude: /node_modules/,
                    },
                },
            },
        ],
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 25000,
    },
    output: {
        filename: 'index.js',
        path: path.resolve('./lib'),
        libraryTarget: 'umd',
        library: 'gr4vy',
        globalObject: 'this',
    },
    entry: path.resolve('./src'),
}