import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignUp from '../../pages/Authentication/SignUp';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import instance from '../../axios/instance';

jest.mock('../../axios/instance');

const mockedInstance = instance as jest.Mocked<typeof instance>;

describe('Intergration Testing for Sign Up.', () => {

    
      test('Displays error message from server, when email already exsist', async () => {

        const mockResponse = { status: 400, data: { data: { message: 'Conflict', status: 400} } };
        mockedInstance.post.mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'valid@valid.com' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
        fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password' } });
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
        
        await waitFor( async () => { 
        const errorMessage = await screen.findByText(/Conflict/i);
        expect(errorMessage).toBeInTheDocument();
    });

      });

    test('token added on successful sign up', async () => {

        const mockResponse = { status: 200, data: { data: { accessToken: 'test-token' } } };
        mockedInstance.post.mockResolvedValue(mockResponse);

        const uniqueEmail = `testuser${Date.now()}@valid.com`;

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        //This test is crteating a user in the backend, if you run the test twice it will fail. Change the email and it will no longer fail
        fireEvent.change(screen.getByPlaceholderText(/enter your full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: uniqueEmail } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
        fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: 'password' } });

        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const authToken = localStorage.getItem('authToken');
            expect(authToken).toBeTruthy();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
      });
});

