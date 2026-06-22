import container from "../../container.js";
import logger from "../../logger/index.js";

class AuthenticationsHandler {
    async login(req, res, next) {
        try {
            const loginUserUseCase = container.getInstance('LoginUserUseCase');

            const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body);

            logger.info('User berhasil login', { username: req.body.username });

            return res.status(201).json({
                status: 'success',
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } catch(error) {
            return next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const refreshAuthenticationUseCase = container.getInstance('RefreshAuthenticationUseCase');

            const { accessToken } = await refreshAuthenticationUseCase.execute(req.body);

            return res.status(200).json({
                status: 'success',
                data: { accessToken },
            });

        } catch (error) {
            return next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const logoutUserUseCase = container.getInstance('LogoutUserUseCase');

            await logoutUserUseCase.execute(req.body);

            logger.info('User berhasil logout');

            return res.status(200).json({
                status: 'success',
                message: 'Logout berhasil',
            });

        } catch (error) {
            return next(error);
        }
    }
}

export default new AuthenticationsHandler();