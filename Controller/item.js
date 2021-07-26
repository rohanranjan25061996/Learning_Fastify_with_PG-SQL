let items = require('../items')
const { v4: uuidv4 } = require('uuid')




const getItems = (req, res) => {

    res.send(items)
}

const getItem = async (req, res, fastify) =>{
   try {
    const {id} = req.params
    const data = await fastify.db.one('SELECT * FROM items WHERE active = $1', [id])
    res.send( data )

   }catch(err){
       return err
   }
}

const addItem = (req, res) =>{

    const {name} = req.body
    console.log("name is => ", name)
    const item = {
        id: uuidv4(),
        name,
    }

    items = [...items, item]

    res.code(201).send(item)
}

const deleteItem = (req, res) =>{

    const {id} = req.params
    items = items.filter(item => item.id !== id)
    res.send({message: `Item ${id} has been removed`})
}

const updateItem = (req, res) =>{

    const {id} = req.params
    const {name} = req.body
    items = items.map(item => (item.id === id ? {id, name} : item))
    const item = items.find(item => item.id === id)
    res.send(item)

}

module.exports = {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem
}