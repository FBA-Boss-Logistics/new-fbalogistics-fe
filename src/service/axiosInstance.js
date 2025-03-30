import axios from 'axios';
import {
  getLocalStorageItem,
  localStorageKeys,
  getPathnameLocalStorageItem,
} from 'hooks';
import { RefreshAccessToken, handleRefreshAuthtokens } from 'queries/Auth';
import { routes } from 'routes/RouteConstants';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
});

const handleLogoutRedirectUser = () => {
  localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
  localStorage.removeItem(localStorageKeys.REFRESH_TOKEN);
  localStorage.removeItem(localStorageKeys.USER_DETAILS);
  window.location.href = routes.HOME.pathname;
};


AxiosInstance.interceptors.request.use(async (config) => {
  const authToken = await getLocalStorageItem(localStorageKeys.AUTH_TOKEN);
  if (authToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${authToken}`,
    };
  }
  if (config && config.data && config.method === 'get') {
    config.url = config.url + getPathnameLocalStorageItem();
    config.data = { ...config.data };
  }
  return config;
});

let isRefreshing = false;

AxiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const access_token = await RefreshAccessToken();
        if (access_token) {
          handleRefreshAuthtokens(access_token);
          isRefreshing = false;
          return await AxiosInstance(originalRequest);
        }
      } catch (error) {
        isRefreshing = false;
        handleLogoutRedirectUser();
        return Promise.reject(error);
      }
    }

    if (
      error?.response?.status === 401 &&
      !await getLocalStorageItem(localStorageKeys.AUTH_TOKEN)
    ) {
      handleLogoutRedirectUser();
    }

    return Promise.reject(error.response.data);
  }
);


export default AxiosInstance;