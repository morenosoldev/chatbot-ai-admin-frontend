import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignUp from '../../pages/Authentication/SignUp.tsx';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';

jest.mock('../../axios/instance', () => ({
  ...jest.requireActual('../../axios/instance'),
  post: jest.fn((url, data) => {
    if (url === '/auth/sign-up' && data.email === 'existingemail@valid.com') {
      // Simulate a conflict error response
      return Promise.reject({
        response: {
          data: {
            message: 'Conflict', // Simulating server error response
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Intergration Testing for Sign Up.', () => {
  test('Displays error message from server, when email already exsist', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'existingemail@valid.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('confirm-password-input'), {
      target: { value: 'password' },
    });
    const submitButton = screen.getByRole('button', {
      name: /create account/i,
    });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(/Conflict/i); // Check the error message text
  });

  test('token added on successful sign up', async () => {
    const uniqueEmail = `testuser${Date.now()}@valid.com`;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>,
    );

    // Creates a new user every time it runs.
    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: uniqueEmail },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByTestId('confirm-password-input'), {
      target: { value: 'password' },
    });

    const submitButton = screen.getByRole('button', {
      name: /create account/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const authToken = localStorage.getItem('authToken');
      expect(authToken).toBe('mock-token');
    });
  });
});
