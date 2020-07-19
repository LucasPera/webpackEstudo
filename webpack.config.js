const path = require('path');

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
    }
}