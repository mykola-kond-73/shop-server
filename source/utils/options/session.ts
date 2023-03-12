export const sessionOptions = {
    name:               'user',
    secret:             '1q2w3e4r',
    resave:            true,
    rolling:           true,
    saveUninitialized: false,
    cookie:            {
        httpOnly: true,
        maxAge:   12*60*60*1000
    }
};