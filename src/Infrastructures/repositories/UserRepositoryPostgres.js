import { nanoid } from "nanoid";
import pkg from 'pg';
const { Pool } = pkg;
import UserRepository from "../../Domains/users/UserRepository.js";
import RegisteredUser from "../../Domains/users/RegisteredUser.js";
import InvariantError from "../../Commons/exceptions/InvariantError.js";
import NotFoundError from "../../Commons/exceptions/NotFoundError.js";

class UserRepositoryPostgres extends UserRepository {
    constructor() {
        super();
        this._pool = new Pool();
    }

    async verifyAvailableUsername(username) {
        const query = {
            text: 'SELECT id FROM users WHERE username = $1',
            values: [username]
        }

        const result = await this._pool.query(query);

        if(result.rows.length > 0) {
            throw new InvariantError('Username sudah digunakan');
        }
    }

    async addUser({username, password, fullname}) {
        const id = `user-${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO users(id, username, password, fullname, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, fullname',
            values: [id, username, password, fullname, createdAt]
        }

        const result = await this._pool.query(query);

        return new RegisteredUser(result.rows[0]);
    }

    async getPasswordByUsername(username) {
        const query = {
            text: 'SELECT password FROM users WHERE username=$1',
            values: [username]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Username tidak ditemukan');
        }

        return result.rows[0].password;
    }

    async getIdByUsername(username) {
        const query = {
            text: 'SELECT id FROM users WHERE username=$1',
            values: [username]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('Username tidak ditemukan');
        }

        return result.rows[0].id;
    }

    async getUserById(id) {
        const query = {
            text: 'SELECT id, username, fullname FROM users WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows[0]) {
            throw new NotFoundError('Id tidak ditemukan');
        }

        return result.rows[0];
    }

    async updateFullnameById(id, fullname) {
        const query = {
            text: 'UPDATE users SET fullname = $1 WHERE id = $2 RETURNING id,username,fullname',
            values: [fullname, id]
        };

        const result = await this._pool.query(query);

        if(!result.rows[0]) {
            throw new NotFoundError('Id tidak ditemukan');
        }

        return result.rows[0];
    }
}

export default UserRepositoryPostgres;

