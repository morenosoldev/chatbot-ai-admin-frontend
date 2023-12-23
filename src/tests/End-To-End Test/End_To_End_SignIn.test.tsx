import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import SignIn from '../../pages/Authentication/SignIn';


describe('End TO END Testing from Sign in to create ChatBot', () => {

    test('User sign in with empty input fields', async () => {
        render(
            <BrowserRouter>
              <SignIn />
            </BrowserRouter>
        );    
        
        const submitButton = screen.getByRole('button', { name: /login/i });
    
        fireEvent.click(submitButton);
    
        const errorMessage = await screen.findByText(/felterne må ikke være tomme/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays error with wrong email or password', async () => {
        render(
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), { target: { value: 'invalid@invalid.com' } });
        fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), { target: { value: 'invalid' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        const errorMessage = await screen.findByText(/Not Found/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('redirects on successful login', async () => {
        render(
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/skriv din email her/i), { target: { value: 'info@spacebox.dk' } });
        fireEvent.change(screen.getByPlaceholderText(/skriv dit password her/i), { target: { value: 'mormor' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            const authToken = localStorage.getItem('authToken');
            expect(authToken).toBeTruthy();
        });
    });
});