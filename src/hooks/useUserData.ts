import { getUserData } from "../api/account";

import { ApiHookResponse, useApiData } from ".";

const useUserData = (): ApiHookResponse => {
  const response: ApiHookResponse = useApiData(getUserData);

  return response;
};

export default useUserData;
