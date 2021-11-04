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
    app.use(
        createProxyMiddleware('/alert-service', {
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/subscription-service', {
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/review-service', {
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    );
}