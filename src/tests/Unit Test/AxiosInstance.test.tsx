import axios, { AxiosRequestConfig } from 'axios';
import axiosInstance from '../../axios/instance';

describe('Axios Instance', () => {
  it('should include access token in headers if token is present', () => {
    // Set a token in mock localStorage
    window.localStorage.setItem('authToken', 'test-token');

    // Mock implementation for request interceptor
    (axios.create().interceptors.request.use as jest.Mock).mockImplementation(
      (config: AxiosRequestConfig) => {
        // Here you can assert if the Authorization header is correctly set
        expect(config.headers?.['Authorization']).toBe('Bearer test-token');
        return config;
      },
    );

    // Trigger a request to invoke the interceptor
    axiosInstance.get('/test-endpoint');

    // Clean up
    window.localStorage.clear();
  });
});
