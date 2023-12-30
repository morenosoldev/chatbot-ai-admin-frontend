import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import ChatbotDemo from '../../components/chatbot/single/ChatbotDemo.tsx';

describe('ChatbotDemo', () => {
  test('Testing get added to chat box when clicking send button', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatbotDemo id="655cde0ec80156c9f88cade0" />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() =>
      fireEvent.change(screen.getByPlaceholderText(/Skriv en besked.../i), {
        target: { value: 'Hi 123' },
      }),
    );

    fireEvent.click(screen.getByRole('button', { name: /Send/i }));

    const userMessage = await waitFor(() =>
      screen.getByTestId('user-message-0'),
    );

    expect(userMessage).toHaveTextContent('Hi 123');
  });
});
