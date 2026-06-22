import container from "../../container.js";
import logger from "../../logger/index.js";

class UsersHandler {
    async postUser(req, res,next) {
        try {
            const addUser = container.getInstance('AddUserUseCase');
            const registeredUser = await addUser.execute(req.body);

            logger.info('User berhasil registrasi', { userId: registeredUser.id });

            return res.status(201).json({
                status: 'success',
                data: {
                    registeredUser
                }
            });
        } catch (error) {
            return next(error);
        }
    }

    async getUserById(req, res, next) {
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
            return next(error);
        }
    }

    async updateFullname(req, res, next) {
        try {
            const updateFullnameUseCase = container.getInstance('UpdateFullnameUseCase');

            const user = await updateFullnameUseCase.execute(req.body, req.params);

            logger.info('User berhasil udpate username', { userId: user.id });

            return res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch(error) {
            return next(error);
        }
    }
}

export default new UsersHandler();