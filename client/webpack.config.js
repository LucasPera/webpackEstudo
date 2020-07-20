const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

if(process.env.NODE_ENV == 'production') {
    plugins.push(new babiliPlugin());
}

module.exports = {
    //ponto de inicio do programa
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //diretorio atual
    },
    module: {
        rules: [
            {
                //considera todos os arquivos .js
                test: /\.js$/,
                //desconsidera pasta node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                } 
            }
        ]      
    },
    plugins
}