const fastify = require('fastify') ({ logger: true }) // logger show some extra information in console

const PORT = 5000
fastify.register( require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {title: 'fastify-api'}
    }
}  )
fastify.register( require("./Routes/items") )
const start = async () => {

    try {

        await fastify.listen(PORT)

    }catch (err) {

        fastify.log.error(err)
        process.exit(1)

    }
}

start()