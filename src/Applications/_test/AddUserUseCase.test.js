import { jest } from '@jest/globals';
import AddUserUseCase from '../use_case/AddUserUseCase.js';

describe ('AddUserUseCase', () => {
    
    test('harus berhasil menambahkan user baru', async () => {
        // Arrange
        const useCasePayload = {
            username: 'budi',
            password: 'budi123',
            fullname: 'Budi Santoso'
        }

        const expectedRegisteredUser = {
            id: 'user-123',
            username: 'budi',
            fullname: 'Budi Santoso'
        }

        const mockUserRepository = {
            verifyAvailableUsername: jest.fn().mockResolvedValue(),
            addUser: jest.fn().mockResolvedValue(expectedRegisteredUser)
        }

        const mockPasswordHash = {
            hash: jest.fn().mockResolvedValue('hashed_password')
        }

        const addUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash
        });

        // Act

        const registeredUser = await addUserUseCase.execute(useCasePayload);

        // Assert
        expect(registeredUser).toEqual(expectedRegisteredUser);

        expect(mockUserRepository.verifyAvailableUsername).toHaveBeenCalledWith('budi');

        expect(mockPasswordHash.hash).toHaveBeenCalledWith('budi123');

        expect(mockUserRepository.addUser).toHaveBeenCalledWith({
            username: 'budi',
            password: 'hashed_password',
            fullname: 'Budi Santoso'
        });
    });

    test('harus error jika username sudah digunakan', async () => {
        const mockUserRepository = {
            verifyAvailableUsername: jest.fn().mockRejectedValue(new Error('Username sudah digunakan')),
            addUser: jest.fn()
        }

        const mockPasswordHash = {
            hash: jest.fn(),
        }

        const addUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash
        });

        await expect(addUserUseCase.execute({
            username: 'budi',
            password: 'budi123',
            fullname: 'Budi Santoso'
        })).rejects.toThrow('Username sudah digunakan');

        expect(mockPasswordHash.hash).not.toHaveBeenCalled();
        expect(mockUserRepository.addUser).not.toHaveBeenCalled();
    });
});