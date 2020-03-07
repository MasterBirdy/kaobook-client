const path = require("path");

module.exports = {
    transpileDependencies: ["vuetify"],
    outputDir: path.resolve(__dirname, "../public"),
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/profile": {
                target: "http://localhost:3000"
            },
            "/auth": {
                target: "http://localhost:3000"
            },
            "/registeruser": {
                target: "http://localhost:3000"
            }
        }
    }
};
