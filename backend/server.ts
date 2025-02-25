const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(
    '/api',
    proxyMiddleware.createProxyMiddleware({
        // target: 'https://mor-stats-backend-docker.yellowstone-d4767df9.centralus.azurecontainerapps.io',
        target: 'https://morpheus-ai-metrics-a9febnfedac6a6fx.centralus-01.azurewebsites.net',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
    })
)

app.listen(5000, () => console.log(`Proxy server running on https://localhost:5000`))
