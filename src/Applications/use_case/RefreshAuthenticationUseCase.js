class RefreshAuthenticationUseCase {
    constructor({ authenticationRepository, tokenManager }) {
        this._authenticationRepository = authenticationRepository;
        this._tokenManager = tokenManager;
    }

    async execute({ refreshToken }) {
        await this._authenticationRepository.checkAvailabilityToken(refreshToken);

        await this._tokenManager.verifyRefreshToken(refreshToken);

        const { userId, username } = await this._tokenManager.decodePayload(refreshToken);

        const accessToken = await this._tokenManager.createAccessToken({ userId, username });

        return { accessToken };
    }
}
export default RefreshAuthenticationUseCase;