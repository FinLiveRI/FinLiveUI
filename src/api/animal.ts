import http from "./reqWithAuth";
import useMock from "../mock/animal/api";
import { getStoredOrgId, getStoredFarmId} from "../utils/helpers";

const url = "/charts/animalchart";
const animal_url = "/animal"

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

  export const getAnimals = () =>
    http.get(animal_url, { headers: {"x-org": getStoredOrgId(), "x-farm": getStoredFarmId()} });