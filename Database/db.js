const fp = require('fastify-plugin')
const pgp = require('pg-promise')()
const appConfig = require('../appconfig')

module.exports = fp( async function (fastify, opts, next) {
    const db = await pgp( appConfig.postgresURI )
    console.log("DATABASE CONNECTED SUCCESS")
    fastify.decorate('db', db)

    next()
})