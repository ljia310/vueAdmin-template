var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://www.easy-mock.com/mock/59c08acbe0dc663341af3387/mock"',
})
