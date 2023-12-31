import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/instance';
import { Link } from 'react-router-dom';

interface Chatbot {
  _id: string;
  id: string;
  name: string;
  message: string;
  userId: string;
  temperature: number;
  rateLimiting: number;
  suggestedMessages: string[];
  logo: string;
  userMessageColor: string;
  botMessageColor: string;
}

const ChatbotTable: React.FC = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axiosInstance
      .get('/bot/chatbots')
      .then((response) => {
        setChatbots(response.data.data.chatbots);
      })
      .catch(() => {
        setError('Failed to fetch chatbots');
      });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Oversigt af Chatbots
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Virksomhed
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Foreslåede beskeder
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Afprøv
            </h5>
          </div>
        </div>

        {error && (
          <div
            className="text-red-500 text-center py-4"
            data-testid="error-message"
          >
            {error}
          </div>
        )}
        {chatbots.map((chatbot, i) => (
          <div
            key={chatbot.id}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
          >
            <div className="flex flex-column items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {chatbot.logo ? (
                  <>
                    <img src={chatbot.logo} alt="Intet logo" width={150} />
                  </>
                ) : (
                  <p>Intet logo valgt.</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p
                className="text-black dark:text-white"
                data-testid={`chatbot-id-${i}`} // Use unique test ID
              >
                {chatbot.id}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div>
                {chatbot.suggestedMessages.map((suggestedMessage, index) => (
                  <button
                    key={index}
                    data-testid={`suggested-message-${i}-${index}`} // Use unique test ID
                    className="border rounded p-2 m-2 transition duration-300 hover:bg-blue hover:text-white"
                  >
                    {suggestedMessage}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Link
                to={`/chatbots/${chatbot._id}`}
                data-testid={`go-to-chatbot-${i}-${chatbot._id}`} // Use unique test ID
              >
                <button className="flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-black rounded-md hover:bg-blue-600">
                  <span>Gå til chatbot</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotTable;
