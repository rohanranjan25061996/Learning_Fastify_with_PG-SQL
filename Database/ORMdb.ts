import {Student} from "../entity/student"
import { Items } from "../entity/item"
import { createConnection } from "typeorm"

async function Database (fastify, options, next) {
    const conn = createConnection({
        type: "postgres",
        url: "postgres://pjduwckr:ubKjh9EuNsWbMXNRBq47Ok2wCz5THZgm@kashin.db.elephantsql.com/pjduwckr",
        entities: [Items],
        name: "mine"
    })
    next()
}

export {Database}