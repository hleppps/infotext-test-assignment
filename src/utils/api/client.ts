import axios from 'axios';

export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (res) => res,
  (error) => {
    throw error.response;
  },
);
