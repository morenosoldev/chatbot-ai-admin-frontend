import React, { ReactElement } from 'react';

interface FileUploadsProps {
  getRootProps: () => Record<string, any>;
  getInputProps: () => Record<string, any>;
  selectedFiles: File[];
  handleSaveFile: () => void;
  url: string;
  scrapeAllUrls: () => void;
  setUrl: (value: string) => void;
  handleUrlSubmit: () => void;
}

const FileUploads: React.FC<FileUploadsProps> = ({
  getRootProps,
  getInputProps,
  selectedFiles,
  handleSaveFile,
  url,
  setUrl,
  scrapeAllUrls,
  handleUrlSubmit,
}: FileUploadsProps): ReactElement => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">File Upload</h2>
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-4"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          {selectedFiles.map((file: File) => (
            <p key={file.name}>{file.name}</p>
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
          placeholder="Enter a base URL"
          className="border border-gray-300 p-2 w-full mb-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={scrapeAllUrls}
          className="bg-black text-white p-2 mt-2 rounded-md hover-bg-blue-600"
        >
          Scrape all URLs
        </button>
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
    </div>
  );
};

export default FileUploads;
