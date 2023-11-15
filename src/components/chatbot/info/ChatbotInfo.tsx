import React, { ChangeEvent, useState, ReactElement } from 'react';

interface ChatbotInfoProps {
  name: string;
  setName: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  userId: string;
  setUserId: (value: string) => void;
  logo: String | null;
  setLogo: (file: File) => void;
  suggestedMessages: string[];
  setSuggestedMessages: (value: string[]) => void;
  getRootProps: () => Record<string, any>;
  getInputProps: () => Record<string, any>;
  users: string[];
}

const ChatbotInfo: React.FC<ChatbotInfoProps> = ({
  name,
  setName,
  message,
  setMessage,
  userId,
  setUserId,
  suggestedMessages,
  setSuggestedMessages,
  logo,
  setLogo,
  users,
}: ChatbotInfoProps): ReactElement => {
  const [inputValue, setInputValue] = useState('');

  const handleSuggestedMessagesChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newMessages = e.target.value
      .split(',')
      .map((message: string) => message.trim());
    setSuggestedMessages(newMessages);
    setInputValue(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setUserId(e.target.value);
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Chatbot navn</h2>
        <input
          type="text"
          placeholder="Chatbot navn"
          className="border border-gray-300 p-2 w-full mb-2"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Standard besked</h2>
        <input
          type="text"
          placeholder="Enter a message"
          className="border border-gray-300 p-2 w-full mb-2"
          value={message}
          onChange={handleMessageChange}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Foreslåede beskeder</h2>
        <div className="flex flex-wrap mb-4 gap-2">
          {suggestedMessages.map((message, index) => (
            <span
              key={index}
              className="bg-black text-white py-1 px-2 rounded-md text-sm"
            >
              {message}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type messages separated by commas"
          className="border border-gray-300 p-2 w-full mb-2"
          value={inputValue}
          onChange={handleSuggestedMessagesChange}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Bruger ID</h2>
        <select
          className="border border-gray-300 p-2 w-full mb-2"
          value={userId}
          onChange={handleUserIdChange}
        >
          {users.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Logo</h2>
        <input type="file" onChange={handleLogoChange} />
        {logo && <p>{logo}</p>}
      </div>
    </div>
  );
};

export default ChatbotInfo;
