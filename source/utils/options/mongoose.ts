export const mongooseOptions = {
    // promiseLibrary:     global.Promise,
    // promiseLibrary:     mongoose.Promise,

    maxPoolSize:           100,
    minPoolSize:           50,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS:        30000,
    family: 4,

    // keepAlive: true, 
    // keepAliveInitialDelay: 300000,

    // poolSize:               50,
    // keepAlive:          30000,
    // connectTimeoutMS:   5000,
    // useNewUrlParser:    true,
    // useFindAndModify:   false,
    // useCreateIndex:     true,
    useUnifiedTopology: true,
    autoIndex:          false

    // strictQuery:true            //! у версії 7
}