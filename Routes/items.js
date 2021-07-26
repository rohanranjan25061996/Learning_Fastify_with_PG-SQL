
const {
    getItems, 
    getItem, 
    addItem, 
    deleteItem, 
    updateItem
} = require('../Controller/item')


// DB Instance
let db = null

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

    handler: getItems,
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

    handler: addItem,
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

    handler: deleteItem,
}

const updateItemOpts = {
    schema:{
        response:{
            200: Item
        }
    },

    handler: updateItem,
}

function itemRoutes(fastify, options, done) {

    db = fastify.db

    // Get all items
    fastify.get('/items', getItemsOpts)
    
    // Get single item
    fastify.get('/items/:id', getItemOpts, async (req, res) => {
        try {
            const {id} = req.params
            const data = await fastify.db.one('SELECT * FROM items WHERE id = $1', [id])
            console.log("DATA is => ", data)
            res.send( data )
        
           }catch(err){
               return err
           }
    })

    // Add item
    fastify.post('/items', postItemOpts)

    // Delete item
    fastify.delete("/items/:id", deleteItemOpts)

    // Update item
    fastify.put('/items/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes