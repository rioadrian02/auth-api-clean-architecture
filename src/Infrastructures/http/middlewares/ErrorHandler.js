import ClientError from "../../../Commons/exceptions/ClientError.js";
import logger from "../../logger/index.js";

const ErrorHandler = (error, req, res, next) => {
    if(error instanceof ClientError) {
        // Cukup level warn, ini bagian normal operasional API
        logger.warn(error.message, {statusCode: error.statusCode});

        return res.status(error.statusCode).json({
            status: 'fail',
            message: error.message
        });
    }

    if (/^[A-Z_]+\.[A-Z_]+$/.test(error.message)) {
        // Error dari Domain (REGISTER_USER.xxx, LOGIN_USER.xxx, dll)
        logger.warn(error.message);

        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
    
    logger.error(error.message, { stack: error.stack });

    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
}

export default ErrorHandler;