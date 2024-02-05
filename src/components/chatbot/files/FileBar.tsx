const FileBar = ({ savedFiles, savedUrls, removeUrl }: any) => {
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
            <span
              key={index}
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 me-2 mt-2 text-sm font-medium text-blue-800 bg-blue rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {url}
              <button
                type="button"
                className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
              >
                <svg
                  onClick={() => removeUrl(url)}
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileBar;
