const createOrders = {
    type: 'object',
    properties: {
        customer: {
            type: 'string'
        },
        products: {
            type: 'array',
            item: {
                type: 'obgect',
                properties: {
                    product: {
                        type: 'string'
                    },
                    count: {
                        type: 'integer'
                    }
                },
                require:['product','count'],
                additionalProperties: false
            }
        },
        comment: {
            type: 'string'
        }
    },
    require: ['customers', 'products', 'comment'],
    additionalProperties: false
}



export{
    createOrders
} 