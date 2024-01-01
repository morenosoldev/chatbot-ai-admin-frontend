import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import ChatbotDemo from '../../components/chatbot/single/ChatbotDemo.tsx';
import axiosInstance from '../../axios/instance.ts';
import { screen } from '@testing-library/react';

jest.mock('../../axios/instance', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const mockedGet = axiosInstance.get as jest.Mock;
const mockedPost = axiosInstance.post as jest.Mock;

beforeEach(() => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve({ data: null }),
          });
        }, 1000),
      ),
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

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
    });
  });

  test('displays loading indicator when a message is being sent', async () => {
    const mockChatbotData = {
      _id: 'mock-chatbot-id',
      logo: 'mock-logo-url',
      chatbotai: 'Mock Chatbot AI',
      messages: [{ isBot: true, message: 'Welcome to the mock chatbot!' }],
      userMessageColor: 'blue',
      userTextColor: 'white',
      suggestedMessages: [
        'Hello',
        'How are you?',
        'Tell me more about your services',
      ],
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

    const userInput = await screen.findByTestId('user-input');
    fireEvent.change(userInput, { target: { value: 'Hello' } });

    jest.useFakeTimers();

    const sendButton = await screen.findByTestId('send-button');
    fireEvent.click(sendButton);

    expect(await screen.findByTestId('loading-indicator')).toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  test('handles click on suggested message', async () => {
    const mockChatbotData = {
      _id: 'mock-chatbot-id',
      logo: 'mock-logo-url',
      chatbotai: 'Mock Chatbot AI',
      messages: [{ isBot: true, message: 'Welcome to the mock chatbot!' }],
      userMessageColor: 'blue',
      userTextColor: 'white',
      suggestedMessages: [
        'Hello',
        'How are you?',
        'Tell me more about your services',
      ],
      botMessageColor: 'grey',
      botTextColor: 'black',
    };

    mockedGet.mockResolvedValueOnce({
      data: { data: { chatbot: mockChatbotData } },
    });

    mockedPost.mockResolvedValueOnce({
      data: {},
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatbotDemo id="chatbot-id" />
        </BrowserRouter>
      </Provider>,
    );

    const suggestedMessageButton = await screen.findByText('Hello');
    fireEvent.click(suggestedMessageButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${
          process.env.VITE_API_URL || 'http://localhost:8000'
        }/bot/chat/chatbot-id`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: 'Hello',
            previousMessages: [
              { isBot: false, message: 'Hello' },
              { isBot: true, message: '' },
            ],
            company: 'Spacebox',
          }),
        },
      );
    });
  });

  test('fetches data on mount and handles error', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Network Error'));

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChatbotDemo id="chatbot-id" />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByTestId('error-message')).toBeInTheDocument();
    });
  });
});
