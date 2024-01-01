import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../../pages/Authentication/SignIn.tsx';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';

// Mock Axios
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  post: jest.fn((url, data) => {
    if (url === '/auth/sign-in' && data.email === 'invalid@invalid.com') {
      // Simulate an error response for invalid user
      return Promise.reject({
        response: {
          data: {
            message: 'Not Found', // Simulating server error response
          },
        },
      });
    } else {
      // Simulate a successful response
      return Promise.resolve({
        data: {
          data: {
            accessToken: 'mock-token',
          },
        },
      });
    }
  }),
}));

describe('Integration Testing for Sign In', () => {
  test('Testing for the right error message, and that it gets displayed, when the user is invalid', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>,
    );

    // Trigger the form submission with invalid user
    fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), {
      target: { value: 'invalid@invalid.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), {
      target: { value: 'invalid' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for error message
    const errorMessage = await screen.findByText(/Not Found/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Token added on successful login', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>,
    );

    // Trigger the form submission with valid user
    fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), {
      target: { value: 'info@spacebox.dk' },
    });
    fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), {
      target: { value: 'mormor' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the token to be added to localStorage
    await waitFor(() => {
      const authToken = localStorage.getItem('authToken');
      expect(authToken).toBeTruthy();
    });
  });
});
