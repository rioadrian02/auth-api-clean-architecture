import pkg from 'pg';
const  { Pool } = pkg;
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
    constructor() {
        super();
        this._pool = new Pool();
    }

    async addToken(token) {
        const query = {
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token],
        };
        await this._pool.query(query);
    }

    async checkAvailabilityToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Refresh token tidak ditemukan di database');
        }
    }

    async deleteToken(token) {
        const query = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        };
        await this._pool.query(query);
    }
}

export default AuthenticationRepositoryPostgres;