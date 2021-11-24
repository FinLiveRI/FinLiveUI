import { FileWithPath } from "file-selector";
import { getStoredOrgId } from "../utils/helpers";
import http from "./reqWithAuth";

/* 
  Uncomment the code below if a mock test is needed for testing and developing the FileUploader and onUploadProgress implementation.
  Keep in mind the adapter intercepts all api calls.
*/

/*
import MockAdapter from "axios-mock-adapter";
import delay from "../mock/delay";

const mock = new MockAdapter(http);

mock.onPost("/upload").reply(async (config) => {
  const total = 1024;
  for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
    await delay(500, 1000);
    if (config.onUploadProgress) {
      config.onUploadProgress({ loaded: total * progress, total });
    }
  }
  const rand: number = Math.floor(Math.random() * 100);
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
  const formData: FormData = new FormData();
  formData.append("file", file, file.name);
  formData.append("type", type);
  formData.append("farmid", farmid);

  return http.post(`${url}`, formData, {
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-org": getStoredOrgId(),
    },
  });
};

export const uploadFile = async (
  file: FileWithPath,
  type: string,
  farmid: string,
  onUploadProgress: any
) => {
  try {
    const response: any = await postFile(file, type, farmid, onUploadProgress);
    return response;
  } catch (error: any) {
    throw Error("File upload failed");
  }
};
