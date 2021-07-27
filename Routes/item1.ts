import {getConnection} from "typeorm"
import { Items } from "../entity/item"


async function item1(fastify, options, next) {
    const db = getConnection('mine')
    fastify.get("/item1", async(req, res) => {
        try {
            const data = await db.getRepository(Items).query('SELECT * from items')
            res.send(data)

        }catch (err) {
            return err
        }
    })

    fastify.get("/item1/:id", async(req, res) => {
        try {
            const {id} = req.params
            const data = await db.getRepository(Items).createQueryBuilder("items")
            .where("items.id = :id", { id })
            .getOne();
            res.send(data)

        }catch (err) {
            return err
        }
    })

    fastify.post("/item1", async(req, res) =>{
        try {
            const {name} = req.body
            await db.getRepository(Items).createQueryBuilder().insert().into(Items).values([{"name" : name}]).execute()
            res.code(200).send("Inserted Data Successfully!")

        }catch (err) {
            return err
        }
    })

    fastify.patch("/item1/:id", async(req, res) =>{
        try {

            const {id} = req.params
            const {name} = req.body
            await db.getRepository(Items).createQueryBuilder().update(Items).set({name: name}).where("id = :id", {id}).execute()
            res.code(200).send("Data Upadted Successfully")

        }catch (err) {
            return err
        }
    })

    fastify.delete("/item1/:id", async(req, res) => {

        try{
            const {id} = req.params
            await db.getRepository(Items).createQueryBuilder().delete().from(Items).where("id = :id", {id}).execute()
            res.code(200).send("Data Delete Successfully")

        }catch(err){

            return err
        }
    })

    next()
}

module.exports = item1