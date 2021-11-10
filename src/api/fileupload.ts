import axios from "axios";
import { FileWithPath } from "file-selector";
import { getStoredToken } from "../utils/helpers";
//import MockAdapter from 'axios-mock-adapter';
import { refreshToken } from "./auth";
//import delay from '../mock/delay';

/* const mock = new MockAdapter(axios);

mock.onPost('/upload').reply(async (config) => {
  const total = 1024;
  for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
    await delay(500, 1000);
    if (config.onUploadProgress) {
      config.onUploadProgress({ loaded: total * progress, total });
    }
  }
  const rand: number = Math.floor(Math.random() * 100)
  return [rand > 50 ? 500 : 200, null];
});
*/

const url: string = "/upload";

const postFile = (
  file: FileWithPath,
  type: string,
  farmid: string,
  onUploadProgress: any
) => {
  const token: string | null = getStoredToken();
  const formData: FormData = new FormData();
  formData.append("file", file, file.name);
  formData.append("type", type);
  formData.append("farmid", farmid);

  const headers: any = {
    Authorization: `Bearer ${token}`,
    "x-org": "1",
  };
  return axios.post(`${url}`, formData, { headers, onUploadProgress });
};

export const uploadFile = async (
  file: FileWithPath,
  type: string,
  farmid: string,
  onUploadProgress: any,
  retryCount = 0
) => {
  try {
    const response: any = await postFile(file, type, farmid, onUploadProgress);
    return response;
  } catch (error: any) {
    if (getStoredToken() && error.response?.status === 401 && !retryCount) {
      await refreshToken();
      await uploadFile(file, type, farmid, onUploadProgress, retryCount + 1);
    } else {
      throw Error("File upload failed");
    }
  }
};
