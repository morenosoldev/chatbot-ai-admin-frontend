import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/instance';
import { Link } from 'react-router-dom';

interface Chatbot {
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

const TableOne: React.FC = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);

  useEffect(() => {
    axiosInstance
      .get('/bot/chatbots')
      .then((response) => {
        setChatbots(response.data.data.chatbots);
      })
      .catch((error) => console.error('Error fetching data:', error));
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

        {/* Table rows */}
        {chatbots.map((chatbot) => (
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
              <p className="text-black dark:text-white">{chatbot.id}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <div>
                {chatbot.suggestedMessages.map((suggestedMessage, index) => (
                  <button
                    key={index}
                    className="border rounded p-2 m-2 transition duration-300 hover:bg-blue hover:text-white"
                  >
                    {suggestedMessage}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Link to={`/chatbots/${chatbot._id}`}>
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

export default TableOne;
