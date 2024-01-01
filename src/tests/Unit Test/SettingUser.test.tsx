import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Settings from '../../pages/Settings';
import axiosInstance from '../../axios/instance';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';

jest.mock('../../axios/instance', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock('react-hot-toast');

const mockedGet = axiosInstance.get as jest.Mock;

describe('Settings Component User Details', () => {
  test('fetches user data on mount and sets it correctly', async () => {
    const mockUserData = {
      name: 'John Doe',
      phone: '123456789',
      email: 'john@example.com',
    };

    mockedGet.mockResolvedValueOnce({ data: { data: mockUserData } });

    const mockStore = configureMockStore();

    const store = mockStore({
      auth: { user: { _id: 'user-id' } },
    });

    const { findByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Settings />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/me');
    });

    expect(await findByTestId('user-name')).toHaveValue(mockUserData.name);
    expect(await findByTestId('user-email')).toHaveValue(mockUserData.email);
    expect(await findByTestId('user-phone')).toHaveValue(mockUserData.phone);
  });
});
