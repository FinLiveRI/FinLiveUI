import axios, { AxiosResponse } from "axios";
import { logError } from "../utils/helpers";

const url = "/auth";

export const login = async (query: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_API}${url}/login`,
      query
    );

    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload();
    }
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const refreshToken = async () => {
  const user: any | null = localStorage.getItem("user");
  const obj: any = user ? JSON.parse(user) : null;

  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_API}${url}/refresh`,
      { refresh: obj.refresh }
    );
    if (response.data.access) {
      const newUser: any = {
        access: response.data.access,
        refresh: obj.refresh,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      return response.data.access;
    }
  } catch (error: any) {
    logError(error);
    logout();
  }
};

export const logout = async () => {
  localStorage.removeItem("user");
  window.location.reload();
};
