import {Database} from "./Database/ORMdb"

const fastify = require('fastify') ({ logger: true }) // logger show some extra information in console

const PORT = 8002

fastify.register( require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {title: 'fastify-api'}
    }
}  )

fastify.register( Database )
// fastify.register( require("./Database/db") )
// fastify.register( require("./Routes/items") )
// fastify.register( require("./Routes/student") )
fastify.register( require("./Routes/item1"))

const start = async () => {

    try {

        await fastify.listen(PORT)

    }catch (err) {

        fastify.log.error(err)
        process.exit(1)

    }
}

start()