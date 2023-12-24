import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import instance from '../../axios/instance';
import SignUp from '../../pages/Authentication/SignUp';

jest.mock('../../axios/instance');
const mockedInstance = instance as jest.Mocked<typeof instance>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

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

  test('valid sign up, sending user to "/" screen', async () => {
    const mockResponse = { status: 200, data: { data: { accessToken: 'test-token' } } };
    mockedInstance.post.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'valid@valid.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password' } });
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });
});
