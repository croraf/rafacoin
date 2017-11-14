const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        inline: true,
        port: 8100,
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname),
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'dist'), 
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader', options: { modules: true}},
                    {loader: 'sass-loader'}
                ]
            },
            {
                /* legacy css from node_modules should not have css-loader modules enabled */
                test: /\.css$/,
                include: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'dist')],
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'} 
                ]
            },
            {
                test: /\.png$/,
                use: { loader: 'file-loader', options: { publicPath: 'dist/' } },
            },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml'},
            {
                test: /\.png$/,
                use: { loader: 'file-loader', options: { publicPath: 'dist/' } },
            }
        ]
    }
};
