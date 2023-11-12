import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileBar from '../components/FileBar';
import ChatPreview from '../components/ChatPreview';
import ColorPicker from '../components/chatbot/colors/ColorPicker';
import ChatbotInfo from '../components/chatbot/info/ChatbotInfo';

type CustomFile = {
  file: File;
};

const Create = () => {
  const [selectedFiles, setSelectedFiles] = useState<CustomFile[]>([]);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [savedFiles, setSavedFiles] = useState<CustomFile[]>([]);
  const [savedUrls, setSavedUrls] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string>(''); // Assuming user IDs are strings
  const [logo, setLogo] = useState<File | null>(null);

  const [showUserMessagePicker, setShowUserMessagePicker] =
    useState<any>(false);
  const [userMessageColor, setUserMessageColor] = useState<any>('#ABB8C3');
  const [botMessageColor, setBotMessageColor] = useState<any>('#000000');
  const [showBotMessagePicker, setShowBotMessagePicker] = useState<any>(false);
  const [showUserTextColorPicker, setShowUserTextColorPicker] =
    useState<any>(false);
  const [showBotTextColorPicker, setShowBotTextColorPicker] =
    useState<any>(false);
  const [userTextColor, setUserTextColor] = useState<any>('#000000');
  const [botTextColor, setBotTextColor] = useState<any>('#FFFFFF');

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
    // ... Add more messages as needed
  ];
  const [users, setUsers] = useState<string[]>(['2', '6']); // Assuming user IDs are strings
  const [messages, setMessages] = useState<any>(sampleMessages);

  const onDrop = (acceptedFiles: File[]) => {
    const customFiles: CustomFile[] = acceptedFiles.map((file) => ({
      file,
    }));

    console.log('customFiles', customFiles);
    setSelectedFiles(customFiles);
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

  const handleLogoChange = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLogo(acceptedFiles[0]);
    }
  };

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold">Opret chatbot</h1>

      <ChatbotInfo
        name={name}
        setName={setName}
        logo={logo}
        setLogo={setLogo}
        message={message}
        setMessage={setMessage}
        userId={userId}
        setUserId={setUserId}
        users={users}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />

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

      <div className="mb-4">
        <h2 className="text-lg font-semibold">File Upload</h2>
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-4"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          {selectedFiles.map((customFile) => (
            <p key={customFile.file.name}>{customFile.file.name}</p>
          ))}
        </div>
      </div>
      <div className="mb-4">
        {selectedFiles.length > 0 && (
          <button
            onClick={handleSaveFile}
            className="bg-black text-white p-2 mt-2 rounded-md hover:bg-blue-600"
          >
            Save File
          </button>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">URL</h2>
        <input
          type="text"
          placeholder="Enter a URL"
          className="border border-gray-300 p-2 w-full mb-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleUrlSubmit}
          className="bg-black text-white p-2 mt-2 rounded-md hover-bg-blue-600"
        >
          Submit URL
        </button>
      </div>
      <FileBar savedFiles={savedFiles} savedUrls={savedUrls} name={name} />
    </div>
  );
};

export default Create;
