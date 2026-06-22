import logger from "../../logger";

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        body: req.method !== 'GET' ? req.body: undefined
    });

    next();
}

export default requestLogger;