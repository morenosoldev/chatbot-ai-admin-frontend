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

const ChatbotDemo: React.FC<ChatbotDemoProps> = ({ id }: ChatbotDemoProps) => {
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/bot/chatbot/${id}`) // Adjust the endpoint accordingly
      .then((response) => {
        console.log('API Response:', response.data);
        setChatbot(response.data.data.chatbot);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const sendMessage = () => {
    if (!userInput.trim()) return; // Do not send empty messages

    const updatedMessages = [
      ...chatbot!.messages,
      { isBot: false, message: userInput },
    ];

    setChatbot({
      ...chatbot!,
      messages: updatedMessages,
    });

    // Send the user's message to the server and get a response
    axiosInstance
      .post(`/bot/chatbot/${id}`, { message: userInput })
      .then((response) => {
        const botResponse = response.data.data.message; // Assuming the server responds with a 'message' field
        const updatedMessages = [
          ...chatbot!.messages,
          { isBot: true, message: botResponse },
        ];

        setChatbot({
          ...chatbot!,
          messages: updatedMessages,
        });
      })
      .catch((error) => console.error('Error sending message:', error));

    setUserInput('');
  };

  return (
    <div>
      {chatbot && (
        <div id="chat-container" className="bg-white border">
          {/* ... (existing code) */}
          <div id="chatbox" className="h-80 overflow-y-auto p-4">
            {chatbot.messages.map((message: Message, index: number) => (
              <div
                key={index}
                className={message.isBot ? 'mb-2' : 'mb-2 text-right'}
              >
                <p
                  style={{
                    backgroundColor: message.isBot
                      ? chatbot.userMessageColor
                      : chatbot.botMessageColor,
                    color: message.isBot
                      ? chatbot.userTextColor
                      : chatbot.botTextColor,
                  }}
                  className={`inline-block rounded-lg ${
                    message.isBot
                      ? 'bg-gray-200 px-4 py-2 text-black'
                      : 'px-4 py-2 text-white'
                  }`}
                >
                  {message.message}
                </p>
              </div>
            ))}
          </div>
          <div className="flex border-t p-4">
            <input
              id="user-input"
              type="text"
              placeholder="Skriv en besked..."
              className="w-full rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
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
