const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/user-service', {
            target: 'http://localhost:8000',
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware('/order-service', {
            target: 'http://localhost:8000',
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware('/catalog-service', {
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    );
}