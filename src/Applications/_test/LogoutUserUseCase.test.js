import { jest } from '@jest/globals';
import LogoutUserUseCase from '../use_case/LogoutUserUseCase.js';

describe('LogoutUserUseCase', () => {
    test('harus berhasil logout dengan menghapus refresh token', async () => {
        const useCasePayload = {
            refreshToken: 'refresh_token_123',
        }

        const mockAuthenticationRepository = {
            checkAvailabilityToken: jest.fn(),
            deleteToken: jest.fn()
        }

        const logoutUserUseCase = new LogoutUserUseCase({
            authenticationRepository: mockAuthenticationRepository
        });

        await logoutUserUseCase.execute(useCasePayload);

        expect(mockAuthenticationRepository.checkAvailabilityToken).toHaveBeenCalledWith('refresh_token_123');
        expect(mockAuthenticationRepository.deleteToken).toHaveBeenCalledWith('refresh_token_123');
    });

    test('harus error jika token tidak ditemukan', async () => {
        const mockAuthenticationRepository = { 
            checkAvailabilityToken: jest.fn().mockRejectedValue(new Error('Refresh token tidak ditemukan di database')),
            deleteToken: jest.fn()
        }

        const logoutUserUseCase = new LogoutUserUseCase({
            authenticationRepository: mockAuthenticationRepository,
        })

        const useCasePayload = {
            refreshToken: 'refresh_token_salah'
        }

        await expect(logoutUserUseCase.execute(useCasePayload)).rejects.toThrow('Refresh token tidak ditemukan di database');

        expect(mockAuthenticationRepository.deleteToken).not.toHaveBeenCalled();


        
    });
});