import axios from 'axios';

export const remote = axios.create({
  baseURL: '/api',
});
