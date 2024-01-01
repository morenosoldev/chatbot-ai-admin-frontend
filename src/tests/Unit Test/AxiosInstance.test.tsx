import axios, { AxiosRequestConfig } from 'axios';
import axiosInstance from '../../axios/instance';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');

  return {
    ...originalModule,
    create: () => ({
      ...originalModule.default.create(),
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
    }),
  };
});

describe('Axios Instance', () => {
  it('should include access token in headers if token is present', () => {
    window.localStorage.setItem('authToken', 'test-token');

    (axios.create().interceptors.request.use as jest.Mock).mockImplementation(
      (config: AxiosRequestConfig) => {
        expect(config.headers?.['Authorization']).toBe('Bearer test-token');
        return config;
      },
    );

    axiosInstance.get('/test-endpoint');

    window.localStorage.clear();
  });
});
