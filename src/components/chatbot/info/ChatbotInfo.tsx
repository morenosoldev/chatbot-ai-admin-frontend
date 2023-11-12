import React from 'react';

export default function ChatbotInfo({
  name,
  setName,
  message,
  setMessage,
  userId,
  setUserId,
  logo,
  setLogo,
  getRootProps,
  getInputProps,
  users,
}) {
  return (
    <div className="mt-8">
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
        <h2 className="text-lg font-semibold">Message</h2>
        <input
          type="text"
          placeholder="Enter a message"
          className="border border-gray-300 p-2 w-full mb-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">User ID</h2>
        {/* Assuming userIdOptions is an array of available user IDs */}
        <select
          className="border border-gray-300 p-2 w-full mb-2"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-4"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop logo here, or click to select a logo</p>
          {logo && <p>{logo.name}</p>}
        </div>
      </div>
    </div>
  );
}
