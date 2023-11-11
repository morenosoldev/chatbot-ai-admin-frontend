import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileBar from '../components/FileBar';

type CustomFile = {
  file: File;
};

const Create = () => {
  const [selectedFiles, setSelectedFiles] = useState<CustomFile[]>([]);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [savedFiles, setSavedFiles] = useState<CustomFile[]>([]);
  const [savedUrls, setSavedUrls] = useState<string[]>([]);

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

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Opret chatbot</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Chatbot navn</h2>
        <input
          type="text"
          placeholder="Chatbot navn"
          className="border border-gray-300 p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
