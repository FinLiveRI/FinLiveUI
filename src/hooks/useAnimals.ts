import { getAnimals } from "../api/animal";

import { ApiHookResponse, useApiData } from ".";

const useAnimals = (): ApiHookResponse => {
  const response: ApiHookResponse = useApiData(getAnimals);
  return response;
};

export default useAnimals;
