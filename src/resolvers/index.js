const lodash = require('lodash')

const authResolver = require('./auth')
const logsResolver = require('./logs')

const resolvers = lodash.merge(authResolver, logsResolver)

module.exports = resolvers
