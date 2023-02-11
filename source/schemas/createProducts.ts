const createProducts={
    type:'object',
    properties:{
        title:{
            type:'string'
        },
        description:{
            type:'string'
        },
        price:{
            type:'number'
        },
        discount:{
            type:'number'
        },
        total:{
            type:'number'
        },
        isTop:{
            type:'boolean'
        },
        section:{
            type:'string',
            enum:['IPhone','Mac','IPad','Apple Watch','AirPods','Accessories','Covers & Bags']
        },    
        share:{
            type:['object','null'],
            properties:{
                title:{
                    type:'string'
                },
                description:{
                    type:'string'
                }
            },
            require:['title','description'],
            additionalProperties:false
        }
        // avatar:{
        //     type:'object',
        //     properties:{
        //         small:{
        //             type:['string','null']
        //         },
        //         large:{
        //             type:['string','null']
        //         }
        //     },
        //     require:['small','large'],
        //     additionalProperties:false
        // },
        // photos:{
        //     type:'array',
        //     items:{
        //         type:'string'
        //     }
        // },
       
    },
    
    require:['title','description','price','discount','total','isTop','section'],
    additionalProperties:true
}

export {
    createProducts
}