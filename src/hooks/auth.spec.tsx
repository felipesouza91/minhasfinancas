import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';
import { startAsync } from 'expo-auth-session';

fetchMock.enableMocks();

jest.mock('expo-auth-session');

describe('Auth Hook Spec', () => {
  it('should able to signin with Google Account existing', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      params: {
        access_token: 'valid_token',
      },

      type: 'success',
    });
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 'any_id',
        email: 'rodrigo.goncalves@rocketseat.team',
        name: 'Rodrigo',
        photo: 'any_photo.png',
      })
    );
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(async () => {
      result.current.signInWithGoogle();
    });
    expect(result.current.user.email).toBe('rodrigo.goncalves@rocketseat.team');
  });

  it('should not be able to signin if authentications are cancelled Google Account', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockResolvedValueOnce({
      type: 'cancel',
    });
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 'any_id',
        email: 'rodrigo.goncalves@rocketseat.team',
        name: 'Rodrigo',
        photo: 'any_photo.png',
      })
    );
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(async () => {
      result.current.signInWithGoogle();
    });
    expect(result.current.user).not.toHaveProperty('id');
  });
  it('should be error to signin with Google Account', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    try {
      await act(async () => {
        result.current.signInWithGoogle();
      });
    } catch (error) {
      expect(result.current.user).toThrow();
    }
  });
});
