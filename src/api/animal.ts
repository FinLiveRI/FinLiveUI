import http from "./request";
import useMock from "../mock/animal/api";

const url = "/animal";

export type AnimalDataQuery = {
  id: string;
  farmid?: string;
  startDate?: string;
  endDate?: string;
};

const getAnimal = (query: AnimalDataQuery) => {
  return http.get(`${url}/${query.id}`, { params: query });
};

export const getAnimalData = process.env.API
  ? getAnimal
  : async (query: AnimalDataQuery) => useMock(query);
