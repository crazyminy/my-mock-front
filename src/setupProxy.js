const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/pxy', {
        target: "http://127.0.0.1:3001/",
        pathRewrite: {'^/pxy': ''},
        changeOrigin: true
    }));
};
