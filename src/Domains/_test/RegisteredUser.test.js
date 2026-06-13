import { jest } from '@jest/globals';
import RegisteredUser from '../users/RegisteredUser.js';

describe('RegisteredUser', () => {
    test('harus error jika property tidak lengkap', () => {
        expect(() => new RegisteredUser({
            id: 'user-123',
            username: 'budi',
        })).toThrow('REGISTERED_USER.MISSING_REQUIRED_PROPERTY');
    });

    test('harus error jika tipe data salah', () => {
        expect(() => new RegisteredUser({
            id: 123,
            username: 123,
            fullname: 123
        })).toThrow('REGISTERED_USER.WRONG_DATA_TYPE');
    });

    test('harus berhasil jika data valid', () => {
        const registeredUser = new RegisteredUser({
            id: 'user-123',
            username: 'username123',
            fullname: 'user 123'
        });

        expect(registeredUser.id).toBe('user-123');
        expect(registeredUser.username).toBe('username123');
        expect(registeredUser.fullname).toBe('user 123');
    });
});