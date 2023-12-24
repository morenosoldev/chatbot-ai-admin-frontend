const FileBar = ({ savedFiles, savedUrls }: any) => {
  return (
    <div className="w-full bg-black p-4 text-white">
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold mb-2 text-white">Saved Files</h2>
        <div className="flex flex-wrap">
          {savedFiles.map((file: File) => (
            <div
              key={file.name}
              className="bg-blue-500 text-white p-2 m-2 rounded-md"
            >
              {file.name} Type: {file.type}
            </div>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-4 text-white">
          Saved URLs
        </h2>
        <div className="flex flex-wrap">
          {savedUrls.map((url: string, index: number) => (
            <div
              key={index}
              className="bg-green-500 text-white p-2 m-2 rounded-md"
            >
              {url}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileBar;
