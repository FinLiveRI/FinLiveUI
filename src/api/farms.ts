import axios from "axios";
import { getStoredToken } from "../utils/helpers";

const url = "/management/barns";

export const getFarms = () => {
  const token: string | null = getStoredToken();

  return axios.get(`${process.env.REACT_APP_API}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-org": "1",
    },
  });
};
