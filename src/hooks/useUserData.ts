import { getUserData } from "../api/account";

import { ApiHookResponse, useApiData, useAuth } from ".";

const useUserData = (): ApiHookResponse => {
  const response: ApiHookResponse = useApiData(getUserData);
  const user = useAuth().currentUser;
  if (!user) return { data: null, isLoading: false, error: null };

  return response;
};

export default useUserData;
