
const {
    getItems, 
    getItem, 
    addItem, 
    deleteItem, 
    updateItem
} = require('../Controller/item')


// Item Schema
const Item = {

    type: 'object',
    properties:{
        id: {type: 'string' },
        name: {type: 'string'}
    }
}


//Options for get all items

const getItemsOpts = {

    schema:{
        response:{
            200: {
                type: 'array',
                items: Item
            }
        }
    },

    // handler: getItems,
}


const getItemOpts = {
    schema:{
        response:{
            200: Item
        }
    },
    // handler: getItem,
}

const postItemOpts = {
    schema:{
        body:{
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'}
            }
        },
        response:{
            201: Item,
        }
    },

    // handler: addItem,
}

const deleteItemOpts = {
    schema:{
        response:{
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        }
    },

    // handler: deleteItem,
}

const updateItemOpts = {
    schema:{
        response:{
            200: Item
        }
    },

    // handler: updateItem,
}

function itemRoutes(fastify, options, done) {

    // Get all items
    fastify.get('/items', getItemsOpts, async (req, res) => {
       try {
        const data = await fastify.db.query('SELECT * FROM  items', [true]);
        res.send(data)

       }catch(err) {
           return err
       }
    })
    
    // Get single item
    fastify.get('/items/:id', getItemOpts, async (req, res) => {
        try {
            const {id} = req.params
            const data = await fastify.db.one('SELECT * FROM items WHERE id = $1', [id])
            res.send( data )
        
           }catch(err){
               return err
           }
    })

    // Add item
    fastify.post('/items', postItemOpts, async (req, res) => {

        try{
            const {name} = req.body
            const data = await fastify.db.one('INSERT INTO items(name) VALUES($1) RETURNING id, name', [name])
            res.send( data )

        }catch(err){
            return err
        }

    })

    // Delete item
    fastify.delete("/items/:id", deleteItemOpts, async (req, res) => {

        try{

        }catch(err){

        }

    })

    // Update item
    fastify.put('/items/:id', updateItemOpts ,async (req, res) => {

        try{

        }catch(err){

        }

    })

    done()
}

module.exports = itemRoutes