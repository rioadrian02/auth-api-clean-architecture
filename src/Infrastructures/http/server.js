import express from 'express';
import UserRepositoryPostgres from '../repositories/UserRepositoryPostgres.js';
import BcryptPasswordHash from '../security/BcryptPasswordHash.js';
import AddUserUseCase from '../../Applications/use_case/AddUserUseCase.js';
import ClientError from '../../Commons/exceptions/ClientError.js';
import AuthenticationRepositoryPostgres from '../repositories/AuthenticationRepositoryPostgres.js';
import JwtTokenManager from '../security/JwtTokenManager.js';
import LoginUserUseCase from '../../Applications/use_case/LoginUserUseCase.js';

const createServer = () => {
    const app = express();
    app.use(express.json());

    // Post Users
    app.post('/users', async (req, res) => {
        try {
            const userRepository = new UserRepositoryPostgres();
            const passwordHash = new BcryptPasswordHash();

            const addUser = new AddUserUseCase({
                userRepository,
                passwordHash
            });

            const registeredUser = await addUser.execute(req.body);

            return res.status(201).json({
                status: 'success',
                data: {
                    registeredUser
                }
            });
        } catch (error) {
            return handleError(error, res);
        }
    });

    // post login
    app.post('/authentications', async (req, res) => {
        try {
            const userRepository = new UserRepositoryPostgres();
            const authenticationRepository = new AuthenticationRepositoryPostgres();
            const passwordHash = new BcryptPasswordHash();
            const tokenManager = new JwtTokenManager();

            const loginUserUseCase = new LoginUserUseCase({
                userRepository,
                authenticationRepository,
                tokenManager,
                passwordHash,
            });

            const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body);

            return res.status(201).json({
                status: 'success',
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch(error) {
            return handleError(error, res);
        }
    });

    return app;
}

const handleError = (error, res) => {
    if(error instanceof ClientError) {
        return res.status(error.statusCode).json({
            status: 'fail',
            message: error.message
        });
    }

    if(error.message.includes('REGISTER_USER.')) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }

    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
}

export default createServer;