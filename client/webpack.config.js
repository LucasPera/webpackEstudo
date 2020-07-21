const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    hash: true,
    minify: { //minificar
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
    },    
    filename: 'index.html',
    template: __dirname + '/main.html'
}));

plugins.push(new extractTextPlugin('styles.css'));

//tornar jquery global
plugins.push(
    new webpack.ProvidePlugin({
           '$': 'jquery/dist/jquery.js',
           'jQuery': 'jquery/dist/jquery.js'
    })
);

//cria um modulo apenas para bibliotecas de terceiros
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    
    name: 'vendor',
    filename: 'vendor.bundle.js'
}))

let SERVICE_URL = JSON.stringify('http://localhost:3000');

if(process.env.NODE_ENV == 'production') {

    SERVICE_URL = JSON.stringify('http://enderecosprod:3000');

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    plugins.push(new babiliPlugin());

    //para mimificar css
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true //imprime informações no console
    }))
}

plugins.push(new webpack.DefinePlugin({
    SERVICE_URL: SERVICE_URL
}));

module.exports = {
    //ponto de inicio do programa
    entry: {
        app: './app-src/app.js',
        vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
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
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            { 
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
            }     
        ]      
    },
    plugins
}