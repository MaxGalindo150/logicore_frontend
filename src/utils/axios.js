import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = { // V1
  chat: '/api/v1/chat',
  kanban: '/api/v1/kanban',
  calendar: '/api/v1/calendar',
  auth: {
    me: '/api/v1/auth/me',
    signIn: '/api/v1/auth/sign-in',
    signUp: '/api/v1/auth/sign-up',
  },
  mail: {
    list: '/api/v1/mail/list',
    details: '/api/v1/mail/details',
    labels: '/api/v1/mail/labels',
  },
  post: {
    list: '/api/v1/post/list',
    details: '/api/v1/post/details',
    latest: '/api/v1/post/latest',
    search: '/api/v1/post/search',
  },
  product: {
    list: '/api/v1/product/list',
    details: '/api/v1/product/details',
    search: '/api/v1/product/search',
  },
};
