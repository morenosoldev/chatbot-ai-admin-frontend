import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../../pages/Authentication/SignIn';
import instance from '../../axios/instance';

jest.mock('../../axios/instance');

const mockedInstance = instance as jest.Mocked<typeof instance>;


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('SignIn', () => {

    test('displays an error message when email or password are empty', () => {
        render(
            <BrowserRouter>
              <SignIn />
            </BrowserRouter>
          );    
      const submitButton = screen.getByRole('button', { name: /login/i });
  
      fireEvent.click(submitButton);
  
      expect(screen.getByText(/felterne må ikke være tomme/i)).toBeInTheDocument();
    });


    test('valid sign in, sending user to "/" screen', async () => {
      const mockResponse = { status: 200, data: { data: { accessToken: 'test-token' } } };
      mockedInstance.post.mockResolvedValue(mockResponse);
  
      render(
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      );  
  
      fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), { target: { value: 'valid@valid.dk' } });
      fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), { target: { value: 'valid' } });
  
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });