import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axios/instance';

interface Message {
  isBot: boolean;
  message: string;
}

interface Chatbot {
  _id: string;
  logo?: string;
  chatbotai?: string;
  messages: Message[];
  userMessageColor: string;
  userTextColor: string;
  suggestedMessages: string[];
  botMessageColor: string;
  botTextColor: string;
}

interface ChatbotDemoProps {
  id: string;
}

const ChatbotDemo: React.FC<ChatbotDemoProps> = ({ id }: ChatbotDemoProps) => {
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>();
  const [error, setError] = useState<string | null>(null); // State to track error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/bot/chatbot/${id}`);
        setChatbot(response.data.data.chatbot);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load chatbot data'); // Set error message
      }
    };

    fetchData();
  }, [id]);

  const sendMessage = async () => {
    if (!userInput.trim() || !chatbot) return;
    setLoading(true);
    const currentConversationId =
      conversationId || (await fetchConversationId(chatbot._id));

    const userMessage: Message = { isBot: false, message: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    try {
      let currentMessages = [...messages, userMessage];
      currentMessages.push({ isBot: true, message: '' });
      setMessages(currentMessages);

      const response = await fetch(
        `${process.env.VITE_API_URL || 'http://localhost:8000'}/bot/chat/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: userInput,
            previousMessages: [...messages, userMessage],
            company: 'Spacebox',
            conversationId: currentConversationId,
          }),
        },
      );

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });

        currentMessages[currentMessages.length - 1] = {
          ...currentMessages[currentMessages.length - 1],
          message:
            currentMessages[currentMessages.length - 1].message + decodedChunk,
        };

        setMessages([...currentMessages]); // Ensure immediate state update
      }

      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  const handleSuggestedMessageClick = async (suggestedMessage: string) => {
    if (!chatbot) return;
    setLoading(true);
    const currentConversationId =
      conversationId || (await fetchConversationId(chatbot._id));

    const userMessage: Message = { isBot: false, message: suggestedMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user's message to the chat interface
    setUserInput('');

    try {
      let currentMessages = [...messages, userMessage];
      currentMessages.push({ isBot: true, message: '' });
      setMessages(currentMessages);

      const response = await fetch(
        `${process.env.VITE_API_URL || 'http://localhost:8000'}/bot/chat/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: suggestedMessage,
            previousMessages: currentMessages, // Use currentMessages here
            company: 'Spacebox',
            conversationId: currentConversationId,
          }),
        },
      );

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      let responseMessages = [...currentMessages]; // Use currentMessages for initialization

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });

        responseMessages[responseMessages.length - 1] = {
          ...responseMessages[responseMessages.length - 1],
          message:
            responseMessages[responseMessages.length - 1].message +
            decodedChunk,
        };

        setMessages([...responseMessages]); // Ensure immediate state update
      }

      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  async function fetchConversationId(chatbotId: string) {
    try {
      // Use the Axios instance to send a POST request
      const response = await axiosInstance.post(
        `/bot/conversation/${chatbotId}`,
      );

      const data = response.data;
      setConversationId(data.conversationId); // Store the retrieved conversation ID
      return data.conversationId; // Return the retrieved conversation ID
    } catch (error) {
      console.error('Error fetching conversation ID:', error);
      return null; // Return null in case of an error
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
      e.preventDefault();
    }
  };

  return (
    <div>
      {error && (
        <div data-testid="error-message" className="error-message">
          {error}
        </div>
      )}
      {chatbot && (
        <div id="chat-container" className="bg-white border">
          <div className="flex items-center border-b p-4">
            {chatbot.logo && (
              <img
                src={chatbot.logo}
                alt="Chatbot logo"
                className="max-w-md max-h-8 rounded-full mr-4"
              />
            )}
            <p className="font-semibold text-lg">{chatbot.chatbotai}</p>
          </div>

          <div id="chatbox" className="h-[70vh] overflow-y-auto p-4">
            {messages.map((message: Message, index: number) => (
              <div key={index} className={message.isBot ? 'mb-2' : 'mb-2 flex'}>
                <p
                  style={{
                    backgroundColor: message.isBot
                      ? chatbot.botMessageColor
                      : chatbot.userMessageColor,
                    color: message.isBot
                      ? chatbot.botTextColor
                      : chatbot.userTextColor,
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                  className={`whitespace-pre-line rounded-lg ${
                    message.isBot
                      ? 'bg-gray-200 px-4 flex items-center py-2 text-left text-black'
                      : 'px-4 py-2 ml-auto text-white'
                  }`}
                  data-testid={
                    message.isBot
                      ? `bot-message-${index}`
                      : `user-message-${index}`
                  }
                >
                  {message.message}
                  {loading &&
                    index === messages.length - 1 &&
                    messages[messages.length - 1].isBot && (
                      <div
                        data-testid="loading-indicator"
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 ml-4"
                      ></div>
                    )}
                </p>
              </div>
            ))}
          </div>
          <div>
            {chatbot.suggestedMessages.map((suggestedMessage, index) => (
              <button
                key={index}
                className="border rounded p-2 m-2 transition duration-300 hover:bg-blue hover:text-white"
                onClick={() => handleSuggestedMessageClick(suggestedMessage)}
              >
                {suggestedMessage}
              </button>
            ))}
          </div>
          <div className="flex border-t p-4">
            <input
              id="user-input"
              data-testid="user-input"
              type="text"
              placeholder="Skriv en besked..."
              className="w-full rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onKeyDown={handleKeyPress}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              id="send-button"
              data-testid="send-button"
              className="rounded-r-md px-4 py-2 text-black transition duration-300 hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotDemo;
