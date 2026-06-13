import UserRepositoryPostgres from './repositories/UserRepositoryPostgres.js';
import AuthenticationRepositoryPostgres from './repositories/AuthenticationRepositoryPostgres.js';
import BcryptPasswordHash from './security/BcryptPasswordHash.js';
import JwtTokenManager from './security/JwtTokenManager.js';
import AddUserUseCase from '../Applications/use_case/AddUserUseCase.js';
import LoginUserUseCase from '../Applications/use_case/LoginUserUseCase.js';
import LogoutUserUseCase from '../Applications/use_case/LogoutUserUseCase.js';
import RefreshAuthenticationUseCase from '../Applications/use_case/RefreshAuthenticationUseCase.js';
import DetailUserUseCase from '../Applications/use_case/DetailUserUseCase.js';
import UpdateFullnameUseCase from '../Applications/use_case/UpdateFullnameUseCase.js';

const userRepository = new UserRepositoryPostgres();
const authenticationRepository = new AuthenticationRepositoryPostgres();
const passwordHash = new BcryptPasswordHash();
const tokenManager = new JwtTokenManager();

const container = {
    getInstance(key) {
        switch(key) {
            case 'AddUserUseCase':
                return new AddUserUseCase({userRepository, passwordHash});

            case 'LoginUserUseCase':
                return new LoginUserUseCase({
                    userRepository,
                    authenticationRepository,
                    tokenManager,
                    passwordHash
                });

            case 'LogoutUserUseCase':
                return new LogoutUserUseCase({ authenticationRepository });

            case 'RefreshAuthenticationUseCase':
                return new RefreshAuthenticationUseCase({
                    authenticationRepository,
                    tokenManager,
                });

            case 'DetailUserUseCase':
                return new DetailUserUseCase({ userRepository });

            case 'UpdateFullnameUseCase':
                return new UpdateFullnameUseCase({ userRepository });

            default:
                throw new Error(`Use case ${key.name} tidak ditemukan di container`);
        }
    }
}

export default container;