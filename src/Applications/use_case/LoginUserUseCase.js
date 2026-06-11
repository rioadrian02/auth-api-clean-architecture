import LoginUser from "../../Domains/users/LoginUser.js";

class LoginUserUseCase {
    constructor({ userRepository, authenticationRepository, tokenManager, passwordHash }) {
        this._userRepository = userRepository;
        this._authenticationRepository = authenticationRepository;
        this._tokenManager = tokenManager;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload) {
        // validasi
        const { username, password } = new LoginUser(useCasePayload);

        // 
        const hashedPassword = await this._userRepository.getPasswordByUsername(username);

        const isPasswordMatch = await this._passwordHash.comparePassword(password, hashedPassword);

        if(!isPasswordMatch) {
            throw new Error('LOGIN_USER.WRONG_PASSWORD');
        }

        const userId = await this._userRepository.getIdByUsername(username);

        // generate access token
        const accessToken = await this._tokenManager.createAccessToken({ userId, username });
        const refreshToken = await this._tokenManager.createRefreshToken({ userId, username });

        await this._authenticationRepository.addToken(refreshToken);

        return { accessToken, refreshToken };
    }
}

export default LoginUserUseCase;