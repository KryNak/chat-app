const path = require('path')

module.exports = {
    mode: "development",
    entry: {
        messenger: './src/main/resources/static/js/messenger/index.js',
        login: './src/main/resources/static/js/login/index.js'
    },
    output: {
        path: path.resolve(__dirname,'./src/main/resources/static/built'),
        filename: "[name]/bundle.js",
        clean: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/i,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}]],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}