class AuthenticationRepository {
    async addToken(token) {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async checkAvailabilityToken(token) {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteToken(token) {
        throw new Error('DOMAIN.AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }
}

export default AuthenticationRepository;