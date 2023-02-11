const createCustomers={
    type:'object',
    properties:{
        name:{
            type:'string',
            minlength:2
        },
        email:{
            type:'string',
            format:'email'
        },
        phone:{
            type:'string',
            pattern:'^[0-9]{10}$'
        },
        city:{
            type:'string'
        },
        country:{
            type:'string'
        },
        password:{
            type:'string',
            minlength:8
        }
    },
    require:['name','email','phone','city','country','password'],
    additionalProperties:false
}

const codeCreateCustomers={
    type:'object',
    properties:{
        name:{
            type:'string'
        },
        email:{
            type:'string'
        },
        phone:{
            type:'string'
        },
        city:{
            type:'string'
        },
        country:{
            type:'string'
        },
        password:{
            type:'string'
        }
    },
    require:['name','email','phone','city','country','password'],
    additionalProperties:false
}

const updateCustomers={
    type:'object',
    properties:{
       
        name:{
            type:'string',
            minlength:2
        },
        email:{
            type:'string',
            format:'email'
        },
        phone:{
            type:'string',
            pattern:'^[0-9]{10}$'
        },
        city:{
            type:'string'
        },
        country:{
            type:'string'
        }
    },
    require:['name','email','phone','city','country'],
    additionalProperties:false
}

const codeUpdateCustomers={
    type:'object',
    properties:{
        
        name:{
            type:'string'
        },
        email:{
            type:'string'
        },
        phone:{
            type:'string'
        },
        city:{
            type:'string'
        },
        country:{
            type:'string'
        }
    },
    require:['name','email','phone','city','country'],
    additionalProperties:false
}

export{
    createCustomers,
    codeCreateCustomers,
    updateCustomers,
    codeUpdateCustomers
}