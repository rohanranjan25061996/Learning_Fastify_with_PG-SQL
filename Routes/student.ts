const {getConnection} = require('typeorm')


async function student(fastify, options, next) {
    const db = getConnection('mine')
    

    next()
}

module.exports = student