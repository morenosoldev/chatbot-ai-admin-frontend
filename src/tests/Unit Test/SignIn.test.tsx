import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../../pages/Authentication/SignIn';


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
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });