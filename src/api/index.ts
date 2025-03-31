import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiFormInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export { apiInstance, apiFormInstance };
