class TokenManager {
    async createAccessToken(payload) {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async createRefreshToken(payload) {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async verifyRefreshToken(payload) {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }

    async decodePayload(payload) {
        throw new Error('DOMAIN.TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
}

export default TokenManager;