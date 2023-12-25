import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../../pages/Authentication/SignIn';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';

describe('SignIn', () => {

    test('displays an error message when email or password are empty', () => {
      
      render(
        <Provider store={store}>
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        </Provider>
    );

      const submitButton = screen.getByRole('button', { name: /login/i });
  
      fireEvent.click(submitButton);
  
      expect(screen.getByText(/felterne må ikke være tomme/i)).toBeInTheDocument();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });