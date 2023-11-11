import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Adjust the base URL according to your API endpoint
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
  },
});

export default instance;
