const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    configureWebpack: {
        plugins: [
            new NodePolyfillPlugin() // Voeg polyfills toe voor Node.js globals
        ],
        resolve: {
            fallback: {
                global: require.resolve("global"),
                crypto: false, // Disable unnecessary polyfills
                buffer: false, // Disable unnecessary polyfills
            }
        }
    }
};
