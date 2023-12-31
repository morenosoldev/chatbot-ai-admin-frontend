import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import FileBar from '../components/chatbot/files/FileBar';
import ChatPreview from '../components/ChatPreview';
import ColorPicker from '../components/chatbot/colors/ColorPicker';
import ChatbotInfo from '../components/chatbot/info/ChatbotInfo';
import FileUploads from '../components/chatbot/files/FileUploads';
import useImageUploader from '../firebase/uploadImage.ts';
import axiosInstance from '../axios/instance.ts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type User = {
  _id: string;
  name: string;
  createdAt: string;
  email: string;
};

const Create = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [savedFiles, setSavedFiles] = useState<File[]>([]);
  const [savedUrls, setSavedUrls] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [logo, setLogo] = useState<string | null>(null);
  const [showUserMessagePicker, setShowUserMessagePicker] =
    useState<any>(false);
  const [userMessageColor, setUserMessageColor] = useState<any>('#ABB8C3');
  const [botMessageColor, setBotMessageColor] = useState<any>('#000000');
  const [showBotMessagePicker, setShowBotMessagePicker] = useState<any>(false);
  const [suggestedMessages, setSuggestedMessages] = useState<any>([]);
  const [showUserTextColorPicker, setShowUserTextColorPicker] =
    useState<any>(false);
  const [showBotTextColorPicker, setShowBotTextColorPicker] =
    useState<any>(false);
  const [userTextColor, setUserTextColor] = useState<any>('#000000');
  const [botTextColor, setBotTextColor] = useState<any>('#FFFFFF');

  const navigate = useNavigate();

  const handleSaveButtonClick = () => {
    const formData = new FormData();
    savedFiles.forEach((file: File) => {
      formData.append('savedFiles', file);
    });
    formData.append('savedUrls', JSON.stringify(savedUrls));
    formData.append('name', name);
    formData.append('message', message);
    formData.append('userId', userId);
    formData.append('temperature', '0');
    formData.append('rateLimiting', '0');
    formData.append('suggestedMessages', JSON.stringify(suggestedMessages));
    formData.append('logo', logo || '');
    formData.append('userMessageColor', userMessageColor);
    formData.append('botMessageColor', botMessageColor);
    formData.append('botTextColor', botTextColor);
    formData.append('userTextColor', userTextColor);

    axiosInstance
      .post('/bot/create', formData, { timeout: 0 })
      .then((response) => {
        showToast('Success', 'Din chatbot er blevet oprettet!', 'success');
        navigate(`/chatbots/${response.data.data.id}`);
      })
      .catch((error) => {
        showToast(
          'Fejl',
          `Der skete en fejl: ${error.response.data.message}`,
          'error',
        );
      });
  };

  const sampleMessages = [
    { message: 'Hej! Hvordan kan jeg hjælpe dig i dag?', isBot: true },
    { message: 'Hej! Jeg har et spørgsmål om min konto.', isBot: false },
    { message: 'Selvfølgelig! Hvad vil du gerne vide?', isBot: true },
    {
      message: 'Jeg har glemt mit kodeord. Hvordan kan jeg nulstille det?',
      isBot: false,
    },
    {
      message:
        'Ingen bekymringer! Du kan nulstille dit kodeord ved at gå til login-siden og vælge "Glemt kodeord". Derefter følger du instruktionerne for at oprette et nyt kodeord.',
      isBot: true,
    },
    { message: 'Tak! Det vil jeg prøve.', isBot: false },
    { message: 'Er der andet, jeg kan hjælpe dig med?', isBot: true },
  ];
  const [users, setUsers] = useState<User[]>([]);
  const [messages] = useState<any>(sampleMessages);

  const { uploadFile } = useImageUploader();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleUrlSubmit = () => {
    setSavedUrls([...savedUrls, url]);

    setUrl('');
  };

  const handleSaveFile = () => {
    setSavedFiles([...savedFiles, ...selectedFiles]);
    setSelectedFiles([]);
  };

  const handleLogoChange = async (file: File) => {
    const downloadUrl = await uploadFile(file);
    setLogo(downloadUrl);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        if (response.data.data.length > 0) {
          setUsers(response.data.data); // Assuming the response contains an array of user objects
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'error',
  ) => {
    toast[type](
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>,
    );
  };

  return (
    <div className="mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
      {currentStep === 1 && (
        <ChatbotInfo
          name={name}
          setName={setName}
          logo={logo}
          setLogo={handleLogoChange}
          message={message}
          setMessage={setMessage}
          userId={userId}
          setUserId={setUserId}
          suggestedMessages={suggestedMessages}
          setSuggestedMessages={setSuggestedMessages}
          users={users}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        />
      )}
      {currentStep === 2 && (
        <div className="grid gap-x-16 grid-cols-2 mt-8 mb-8">
          <ColorPicker
            showUserMessagePicker={showUserMessagePicker}
            setShowUserMessagePicker={setShowUserMessagePicker}
            userMessageColor={userMessageColor}
            setUserMessageColor={setUserMessageColor}
            showBotMessagePicker={showBotMessagePicker}
            setShowBotMessagePicker={setShowBotMessagePicker}
            botMessageColor={botMessageColor}
            setBotMessageColor={setBotMessageColor}
            showUserTextColorPicker={showUserTextColorPicker}
            setShowUserTextColorPicker={setShowUserTextColorPicker}
            userTextColor={userTextColor}
            setUserTextColor={setUserTextColor}
            showBotTextColorPicker={showBotTextColorPicker}
            setShowBotTextColorPicker={setShowBotTextColorPicker}
            botTextColor={botTextColor}
            setBotTextColor={setBotTextColor}
          />
          <ChatPreview
            logo={logo}
            messages={messages}
            userMessageColor={userMessageColor}
            botMessageColor={botMessageColor}
            userTextColor={userTextColor}
            botTextColor={botTextColor}
          />
        </div>
      )}
      {currentStep === 3 && (
        <div className=" mx-auto p-4">
          <FileUploads
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            selectedFiles={selectedFiles}
            handleSaveFile={handleSaveFile}
            url={url}
            setUrl={setUrl}
            handleUrlSubmit={handleUrlSubmit}
          />
          <FileBar
            savedFiles={savedFiles}
            savedUrls={savedUrls}
            name={name}
            message={message}
            userId={userId}
            temperature={0}
            rateLimiting={100}
            suggestedMessages={suggestedMessages}
            logo={logo}
            userMessageColor={userMessageColor}
            botMessageColor={botMessageColor}
            botTextColor={botTextColor}
            userTextColor={userTextColor}
          />
        </div>
      )}

      <div className="mt-4">
        {currentStep > 1 && (
          <button
            onClick={handlePrevStep}
            className="bg-black text-white p-2 rounded-md mr-2"
          >
            Tilbage
          </button>
        )}
        {currentStep < 3 ? (
          <button
            onClick={handleNextStep}
            className="bg-black text-white p-2 rounded-md"
          >
            Næste
          </button>
        ) : (
          <button
            className="bg-black text-white p-2 rounded-md"
            onClick={handleSaveButtonClick}
          >
            Opret
          </button>
        )}
      </div>
    </div>
  );
};

export default Create;
