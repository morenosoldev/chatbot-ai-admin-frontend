import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    'Content-type': 'application/json',
  },
});

// Axios interceptor to add the token to each request
axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('authToken'); // Retrieve the token
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
});

export default axiosInstance;
