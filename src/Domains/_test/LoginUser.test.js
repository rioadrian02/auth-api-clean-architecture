import { jest } from '@jest/globals';
import LoginUser from '../users/LoginUser.js';

describe('LoginUser', () => {
    test('harus error jika property tidak lengkap', () => {
        expect(() => new LoginUser({
            username: 'username123',
        })).toThrow('LOGIN_USER.MISSING_REQUIRED_PROPERTY');
    });

    test('harus error jika tipe data salah', () => {
        expect(() => new LoginUser({
            username: 'username123',
            password: true
        })).toThrow('LOGIN_USER.WRONG_DATA_TYPE');
    });

    test('harus berhasil jika data valid', () => {
        const user = new LoginUser({
            username: 'username123',
            password: 'password123'
        });

        expect(user.username).toBe('username123');
        expect(user.password).toBe('password123');
    });
});
