import {Student} from "../entity/student"
import { Items } from "../entity/item"
import { createConnection } from "typeorm"
import {postgresURI} from "../config/ORMConfig"

async function Database (fastify, options, next) {
    await createConnection({
        type: "postgres",
        url: postgresURI,
        entities: [Items, Student],
        name: "mine"
    })
    console.log("ORM Database Connected")
    next()
}

export {Database}