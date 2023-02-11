import winston from 'winston'
import path from 'path'

class Logger {
    level: string
    filename: string

    constructor(level = 'info', filename = 'logger.log') {
        this.level = level,
        this.filename = filename
    }
    create() {
        const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}:${message}`
        })

        const filename = path.resolve(path.join('logs', this.filename))

        const logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.label({
                    label: 'internetShop'
                }),
                winston.format.timestamp(),
                logFormat
            ),
            level: this.level,
            transports: [new winston.transports.File({
                filename,
                level: this.level
            })]
        })

        return logger
    }

}

const queryLogger = new Logger('info', 'query.log').create()
const errorLogger = new Logger('error', 'errors.log').create()
const validationErrorLogger = new Logger('error', 'validation_errors.log').create()
const authErrorLogger = new Logger('error', 'auth_errors.log').create()

export {
    queryLogger,
    errorLogger,
    validationErrorLogger,
    authErrorLogger
}