import http from "./reqWithAuth";
import useMock from "../mock/animal/api";
import { getStoredOrgId } from "../utils/helpers";

const url = "/charts/animalchart";

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

export const getAnimalData = !process.env.API
  ? getAnimal
  : async (query: AnimalDataQuery) => useMock(query);
