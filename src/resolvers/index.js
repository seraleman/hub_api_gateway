const lodash = require('lodash')

const authResolver = require('./auth')

const resolvers = lodash.merge(authResolver)

module.exports = resolvers
