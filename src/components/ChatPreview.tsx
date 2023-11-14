import React from 'react';
import chatbotai from '../images/logo/ChatbotAI-light.png';

type Message = {
  message: string;
  isBot: boolean;
};

type ChatPreviewProps = {
  logo: string | null;
  messages: Message[];
  userMessageColor: string;
  botMessageColor: string;
  userTextColor: string;
  botTextColor: string;
};

const ChatPreview: React.FC<ChatPreviewProps> = ({
  logo,
  messages,
  userMessageColor,
  botMessageColor,
  userTextColor,
  botTextColor,
}: ChatPreviewProps) => {
  return (
    <div id="chat-container" className="bg-white border">
      <div className="flex items-center justify-between rounded-t-lg  border-b  p-4 text-white">
        {logo ? (
          <img
            src={logo}
            width={125}
            height={125}
            alt="Picture of the author"
          />
        ) : (
          <img
            src={chatbotai}
            width={125}
            height={125}
            alt="Picture of the author"
          />
        )}
        <button
          id="close-chat"
          className="text-black hover:text-gray-400 focus:text-gray-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div id="chatbox" className="h-80 overflow-y-auto p-4">
        {messages.map((message: Message) =>
          message.isBot ? (
            <div key={message.message} className="mb-2">
              <p
                style={{
                  backgroundColor: userMessageColor,
                  color: userTextColor,
                }}
                className="inline-block rounded-lg bg-gray-200 px-4 py-2 text-black"
              >
                {message.message}
              </p>
            </div>
          ) : (
            <div key={message.message} className="mb-2 text-right">
              <p
                style={{
                  backgroundColor: botMessageColor,
                  color: botTextColor,
                }}
                className="inline-block rounded-lg px-4 py-2 text-white"
              >
                {message.message}
              </p>
            </div>
          ),
        )}
      </div>
      <div className="flex border-t p-4">
        <input
          id="user-input"
          type="text"
          placeholder="Skriv en besked..."
          className="w-full rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          id="send-button"
          className="rounded-r-md px-4 py-2 text-black transition duration-300 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPreview;
