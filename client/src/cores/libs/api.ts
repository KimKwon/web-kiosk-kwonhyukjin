import axios from 'axios';

export const remote = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : '/api',
});
