import jwt from 'jsonwebtoken';
import TokenManager from '../../Domains/authentications/TokenManager.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';

class JwtTokenManager extends TokenManager {
    async createAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30m'});
    }

    async createRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
    }

    async verifyRefreshToken(token) {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
        } catch {
            throw new InvariantError('Refresh token tidak valid');
        }
    }

    async decodePayload(token) {
        try {
            return jwt.decode(token);
        } catch {
            throw new InvariantError('Token tidak valid');
        }
    }
}

export default JwtTokenManager;