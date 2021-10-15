import { getAnimalData, AnimalDataQuery } from '../api/animal';
import { ApiHookResponse, useApiData } from '.';

const fetchCondition = (query: AnimalDataQuery): boolean => !!query.id;

const useAnimalData = (query: AnimalDataQuery): ApiHookResponse => {
  const response: ApiHookResponse = useApiData(getAnimalData, query, fetchCondition);

  return response;
}

export default useAnimalData;