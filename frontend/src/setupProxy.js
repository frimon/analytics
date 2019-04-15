const proxy = require('http-proxy-middleware')

function setupProxy(app) {
  app.use(proxy('/api', { target: 'http://localhost:3001/' }))
}

module.exports = setupProxy
