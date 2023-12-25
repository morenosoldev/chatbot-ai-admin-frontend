import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../../pages/Settings';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';

describe('Settings Component Phone Number Validation', () => {
  const testCases = [
    { input: '55555555', expectedError: false },
    { input: '10000000', expectedError: false },
    { input: '99999999', expectedError: false },
    { input: '09999999', expectedError: true },
    { input: '100000000', expectedError: true },
    { input: '1234abcd', expectedError: true },
    { input: '1234567', expectedError: true },
    { input: '123456789', expectedError: true },
    { input: '1234-5678', expectedError: true },
    { input: '01234567', expectedError: true },
    { input: '', expectedError: true }
  ];

  testCases.forEach(({ input, expectedError }) => {
    test(`Phone number "${input}" should ${
      expectedError ? 'fail' : 'pass'
    } validation`, async () => {
      const { getByPlaceholderText, queryByText, getByTestId  } =       render(
        <Provider store={store}>
            <BrowserRouter>
                <Settings />
            </BrowserRouter>
        </Provider>
    );
      const phoneInput = getByPlaceholderText('+45 22156649');
      const saveButton = getByTestId('save-button');

      fireEvent.change(phoneInput, { target: { value: input } });
      fireEvent.click(saveButton);

      if (expectedError) {
        await waitFor(() => {
          expect(queryByText('Indtast telefonnummeret korrekt')).toBeInTheDocument();
        });
      } else {
        await waitFor(() => {
          expect(queryByText('Indtast telefonnummeret korrekt')).not.toBeInTheDocument();
        });
      }
    });
  });
});
