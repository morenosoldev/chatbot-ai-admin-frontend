import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatbotTable from '../../components/ChatbotTable';
import axiosInstance from '../../axios/instance';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';

jest.mock('../../axios/instance', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('ChatbotTable', () => {
  test('displays chatbots when the API call succeeds', async () => {
    // Mock a successful API response with sample chatbot data
    const chatbots = [
      {
        _id: '1',
        id: 'chatbot-1',
        name: 'Chatbot 1',
        userId: 'user-1',
        temperature: 98.6,
        rateLimiting: 5,
        suggestedMessages: ['Hello', 'How are you?'],
        logo: 'chatbot1.png',
        userMessageColor: 'blue',
        botMessageColor: 'green',
      },
    ];
    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: { data: { chatbots } },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatbotTable />
        </BrowserRouter>
      </Provider>,
    );

    // Wait for the users to be displayed
    await waitFor(() => {
      chatbots.forEach((chatbot, i) => {
        // Check for chatbot data
        expect(screen.getByText(chatbot.id)).toBeInTheDocument();

        // Check for suggested messages
        chatbot.suggestedMessages.forEach((message, index) => {
          expect(screen.getByText(message)).toBeInTheDocument();
          expect(
            screen.getByTestId(`suggested-message-${i}-${index}`),
          ).toBeInTheDocument();
        });

        // Check for chatbot logo
        expect(screen.getByAltText('Intet logo')).toBeInTheDocument();

        // Check for link to chatbot
        const link = screen.getByTestId(`go-to-chatbot-${i}-${chatbot._id}`);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `/chatbots/${chatbot._id}`);
      });
    });
  });
});
