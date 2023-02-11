import rateLimit from 'express-rate-limit'

export const limiter = (numRequest:number, resetIn:number) => rateLimit({
    windowMs: resetIn,
    max:      numRequest,
    headers:  false
})
