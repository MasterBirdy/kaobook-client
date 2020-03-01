const path = require("path");

module.exports = {
    transpileDependencies: ["vuetify"],
    outputDir: path.resolve(__dirname, "../public"),
    devServer: {
        proxy: {
            "/auth": {
                target: "http://localhost:3000"
            }
        }
    }
};
