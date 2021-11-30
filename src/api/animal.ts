import fileDownload from "js-file-download";
import http from "./reqWithAuth";
import useMock from "../mock/animal/api";
import { getStoredOrgId } from "../utils/helpers";

const url = "/charts/animalchart";
const downloadUrl = "/charts/animalchart/download";

export type AnimalDataQuery = {
  animalid: string;
  farmid: string;
  begin: string;
  end: string;
};

const getAnimal = (query: AnimalDataQuery) => {
  return http.get(`${url}`, {
    headers: { "x-filter": JSON.stringify(query), "x-org": getStoredOrgId() },
  });
};

const downloadAnimalCsv = (query: AnimalDataQuery) => {
  return http
    .get(`${downloadUrl}`, {
      responseType: "blob",
      headers: { "x-filter": JSON.stringify(query), "x-org": getStoredOrgId() },
    })
    .then((response) => {
      fileDownload(response.data, `${query.animalid}.csv`);
    });
};

export const getAnimalData = process.env.REACT_APP_API
  ? getAnimal
  : async (query: AnimalDataQuery) => useMock(query);

export const downloadAnimalData = process.env.REACT_APP_API
  ? downloadAnimalCsv
  : async (query: AnimalDataQuery) => null;
