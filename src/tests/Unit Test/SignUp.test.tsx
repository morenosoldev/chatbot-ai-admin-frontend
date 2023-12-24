import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignUp from '../../pages/Authentication/SignUp';


describe('SignUp', () => {

  test('displays an error message when fields are empty', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/fields must not be empty/i)).toBeInTheDocument();
  });

  test('Displays error message when the passwords does not match', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'valid@valid.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'different' } });
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });


  afterEach(() => {
    jest.clearAllMocks();
  });
});
