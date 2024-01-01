import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignUp from '../../pages/Authentication/SignUp.tsx';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';

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
      target: { value: 'valid@valid.com' },
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

    const errorMessage = await screen.findByText(/Conflict/i);
    expect(errorMessage).toBeInTheDocument();
  });
  /*
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
      expect(authToken).toBeTruthy();
    });
  });
  */
});
