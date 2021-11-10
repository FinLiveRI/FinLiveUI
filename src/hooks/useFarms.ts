import { getFarms } from "../api/farms";

import { ApiHookResponse, useApiData } from ".";

const useFarms = (): ApiHookResponse => {
  const response: ApiHookResponse = useApiData(getFarms);

  return response;
};

export default useFarms;
