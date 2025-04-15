import axios from 'axios';
import i18n from 'i18next';
import {API_KEY, BASE_URL} from '../utils/constants';

const authToken =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGI2MmZiMzIzODlhMzE0ZDhlYjU1YjE3OTQwNTgxNyIsIm5iZiI6MTc0NDUzNzAyOS4wNjcwMDAyLCJzdWIiOiI2N2ZiODVjNTFjZTRhM2ZiMWNkOTBmYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.l83fEupIgTf59neLHy0Umfc2bltspcSzDhJgBK6MPV4';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: authToken,
  },
});

axiosInstance.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    api_key: API_KEY,
    language: i18n.language,
  };
  return config;
});

export default axiosInstance;
