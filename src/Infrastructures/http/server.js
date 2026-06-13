import express from 'express';
import ClientError from '../../Commons/exceptions/ClientError.js';
import container from '../container.js';


const createServer = () => {
    const app = express();
    app.use(express.json());

    // Post Users
    app.post('/users', async (req, res) => {
        try {
            const addUser = container.getInstance('AddUserUseCase');
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
            const loginUserUseCase = container.getInstance('LoginUserUseCase');

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
            const refreshAuthenticationUseCase = container.getInstance('RefreshAuthenticationUseCase');

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
            const logoutUserUseCase = container.getInstance('LogoutUserUseCase');

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
            const detailUserUseCase = container.getInstance('DetailUserUseCase');

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
            const updateFullnameUseCase = container.getInstance('UpdateFullnameUseCase');

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