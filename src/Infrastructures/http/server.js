import express from 'express';
import UserRepositoryPostgres from '../repositories/UserRepositoryPostgres.js';
import AuthenticationRepositoryPostgres from '../repositories/AuthenticationRepositoryPostgres.js';
import BcryptPasswordHash from '../security/BcryptPasswordHash.js';
import JwtTokenManager from '../security/JwtTokenManager.js';
import AddUserUseCase from '../../Applications/use_case/AddUserUseCase.js';
import LoginUserUseCase from '../../Applications/use_case/LoginUserUseCase.js';
import LogoutUserUseCase from '../../Applications/use_case/LogoutUserUseCase.js';
import RefreshAuthenticationUseCase from '../../Applications/use_case/RefreshAuthenticationUseCase.js';
import DetailUserUseCase from '../../Applications/use_case/DetailUserUseCase.js';
import ClientError from '../../Commons/exceptions/ClientError.js';
import UpdateFullnameUseCase from '../../Applications/use_case/UpdateFullnameUseCase.js';

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

    // refresh token
     app.put('/authentications', async (req, res) => {
        try {
            const authenticationRepository = new AuthenticationRepositoryPostgres();
            const tokenManager = new JwtTokenManager();

            const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
                authenticationRepository,
                tokenManager,
            });

            const { accessToken } = await refreshAuthenticationUseCase.execute(req.body);

            return res.status(200).json({
                status: 'success',
                data: { accessToken },
            });

        } catch (error) {
            return handleError(error, res);
        }
    });

    // DELETE /authentications — logout
    app.delete('/authentications', async (req, res) => {
        try {
            const authenticationRepository = new AuthenticationRepositoryPostgres();

            const logoutUserUseCase = new LogoutUserUseCase({
                authenticationRepository,
            });

            await logoutUserUseCase.execute(req.body);

            return res.status(200).json({
                status: 'success',
                message: 'Logout berhasil',
            });

        } catch (error) {
            return handleError(error, res);
        }
    });

    app.get('/users/:id', async (req, res) => {
        try {
            const userRepository = new UserRepositoryPostgres();

            const detailUserUseCase = new DetailUserUseCase({ userRepository });

            const user = await detailUserUseCase.execute(req.params);

            return res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (error) {
            return handleError(error, res);
        }
    });

    app.put('/users/:id', async (req, res) => {
        try {
            const userRepository = new UserRepositoryPostgres();

            const updateFullnameUseCase = new UpdateFullnameUseCase({ userRepository });

            const user = await updateFullnameUseCase.execute(req.body, req.params);

            return res.status(201).json({
                status: 'success',
                data: {
                    user
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

    if (/^[A-Z_]+\.[A-Z_]+$/.test(error.message)) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }


    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
}

export default createServer;