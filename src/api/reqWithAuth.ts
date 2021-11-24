import axios, { AxiosInstance } from "axios";
import { refreshToken, logout } from "./auth";
import { getStoredToken, logError } from "../utils/helpers";

// Create an axios instance
const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  timeout: 300000,
  headers: {
    Authorization: `Bearer ${getStoredToken()}`,
  },
});

instance.defaults.headers.post["Content-Type"] = "application/json";

// Refresh process status
let isRefreshing: boolean = false;

// Retry queue for requests waiting for token refresh
let requests: Array<any> = [];

instance.interceptors.response.use(undefined, (err) => {
  const code: number | null = err.response ? err.response.status : null;

  if (code === 401 && getStoredToken()) {
    const config: any = err.config;

    if (!isRefreshing) {
      isRefreshing = true;

      return refreshToken()
        .then((accessToken: string) => {
          const token: string = accessToken;
          instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          config.headers["Authorization"] = `Bearer ${token}`;

          // Execute all stored requests waiting for refresh
          requests.forEach((storedReq) => storedReq(token));
          requests = [];
          return instance(config);
        })
        .catch((error) => {
          logError(error);
          logout();
        })
        .finally(() => {
          isRefreshing = false;
        });
    } else {
      return new Promise((resolve) => {
        // Put the resolve in the retry queue as a function to be executed after token refresh.
        requests.push((token: string) => {
          config.headers["Authorization"] = `Bearer ${token}`;
          resolve(instance(config));
        });
      });
    }
  } else {
    return Promise.reject(err);
  }
});

export default instance;
