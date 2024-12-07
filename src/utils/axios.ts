import axios from 'axios';
import { getEnvVariable } from '@/utils';
const API_BASE_URL = getEnvVariable('API_BASE_URL');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
