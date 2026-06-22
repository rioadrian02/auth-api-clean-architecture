import winston, { format } from 'winston';

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production'? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({
            stack: true
        }),
        winston.format.json()
    ),
    transports: [
        // selalu tampil di console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),

        // file khusus error saja
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),

        // file semua log(semua level)
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
    ]
});

export default logger;