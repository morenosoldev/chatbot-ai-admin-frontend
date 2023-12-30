import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import ChatbotDemo from '../../components/chatbot/single/ChatbotDemo.tsx';
import axiosInstance from '../../axios/instance.ts';

jest.mock('../../axios/instance', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const mockedGet = axiosInstance.get as jest.Mock;

describe('ChatbotDemo', () => {
  test('ChatbotDemo fetches data on mount and renders', async () => {
    const mockChatbotData = {
      _id: 'chatbot-id',
      messages: [],
      userMessageColor: 'blue',
      userTextColor: 'white',
      suggestedMessages: [],
      botMessageColor: 'grey',
      botTextColor: 'black',
    };

    mockedGet.mockResolvedValueOnce({
      data: { data: { chatbot: mockChatbotData } },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatbotDemo id="chatbot-id" />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/bot/chatbot/chatbot-id');
      // You can add more assertions here to check if the component renders correctly
    });
  });

  test('ChatbotDemo fetches data on mount and renders', async () => {
    const mockChatbotData = {
      _id: 'chatbot-id',
      messages: [],
      userMessageColor: 'blue',
      userTextColor: 'white',
      suggestedMessages: [],
      botMessageColor: 'grey',
      botTextColor: 'black',
    };

    mockedGet.mockResolvedValueOnce({
      data: { data: { chatbot: mockChatbotData } },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatbotDemo id="chatbot-id" />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/bot/chatbot/chatbot-id');
      // You can add more assertions here to check if the component renders correctly
    });
  });
});
