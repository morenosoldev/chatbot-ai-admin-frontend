import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';

interface Message {
  isBot: boolean;
  message: string;
}

interface Chatbot {
  logo?: string;
  chatbotai?: string;
  messages: Message[];
  userMessageColor: string;
  userTextColor: string;
  botMessageColor: string;
  botTextColor: string;
}

interface ChatbotDemoProps {
  id: string;
}
// ... (previous imports and code)

const ChatbotDemo: React.FC<ChatbotDemoProps> = ({ id }: ChatbotDemoProps) => {
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/bot/chatbot/${id}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setChatbot(response.data.data.chatbot);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const sendMessage = () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage: Message = { isBot: false, message: userInput };
    setMessages([...messages, userMessage]); // Add user's message to the chat interface

    axiosInstance
      .post(
        `/bot/chat/${id}`,
        {
          input: userInput,
          previousMessages: [...messages, userMessage], // Send all previous messages including the new user message
          company: 'Spacebox',
        },
        { timeout: 0 },
      )
      .then((response) => {
        const botResponse = response.data.data.chatResponse;
        const botMessage: Message = { isBot: true, message: botResponse };
        setMessages([...messages, userMessage, botMessage]); // Add bot's response to the chat interface
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setLoading(false);
      });

    setUserInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      {chatbot && (
        <div id="chat-container" className="bg-white border">
          {/* ... (existing code) */}
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
                  }}
                  className={`inline-block whitespace-pre-line rounded-lg ${
                    message.isBot
                      ? 'bg-gray-200 px-4 py-2 text-left text-black'
                      : 'px-4 py-2 ml-auto text-white'
                  }`}
                >
                  {message.message}
                </p>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  backgroundColor: chatbot.botMessageColor,
                  color: chatbot.botTextColor,
                }}
                className="flex w-28 rounded px-4 py-2 text-left items-center"
              >
                <span>Tænker...</span>
                <div className="animate-spin rounded-full text-left h-4 w-4 border-b-2 border-gray-900 ml-2"></div>
              </div>
            )}
          </div>
          <div className="flex border-t p-4">
            <input
              id="user-input"
              type="text"
              placeholder="Skriv en besked..."
              className="w-full rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onKeyDown={handleKeyPress}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              id="send-button"
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
