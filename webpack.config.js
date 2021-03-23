const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'swaralipi-core.js',
        libraryTarget: 'var',
        library: {
            name: "SwaralipiCore",
            type: 'umd'
        }
    },
};
