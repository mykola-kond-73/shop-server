const createStaff={
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
        role:{
            type:'string',
            enum:['ceo' ,'testing' ,'frontend' ,'backend' ,'fullstack' ,'manager']
        },
        password:{
            type:'string',
            minlength:8
        },
        isAdmin:{
            type:'boolean'
        }
    },
    required:['name','email','phone','role','password','isAdmin'],
    additionalProperties: false
}

const codeCreateStaff={
    type:'object',
    properties:{
        name:{
            type:'string'
        },
        email:{
            type:'string'
        },
        phone:{type:'string'},
        role:{type:'string'},
        password:{
            type:'string'
        },
        isAdmin:{
            type:'boolean'
        },
        secretKey:{
            type:'string'
        }
    },
    required:['name','email','phone','role','password','isAdmin','secretKey'],
    additionalProperties: false
}

const updateStaff={
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
        role:{
            type:'string',
            enum:['ceo' ,'testing' ,'frontend' ,'backend' ,'fullstack' ,'manager','']
        },
        isAdmin:{
            type:'boolean'
        }
    },
    required:['name','email','phone','role','isAdmin'],
    additionalProperties: false
}

const codeUpdateStaff={
    type:'object',
    properties:{
        name:{
            type:'string'
        },
        email:{
            type:'string'
        },
        phone:{type:'string'},
        role:{type:'string'},
        isAdmin:{
            type:'boolean'
        }
    },
    required:['name','email','phone','role','isAdmin'],
    additionalProperties: false
}

export{
    codeCreateStaff,
    createStaff,
    updateStaff,
    codeUpdateStaff
}