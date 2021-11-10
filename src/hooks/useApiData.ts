import { useState, useEffect } from "react";
import { logError, getStoredToken } from "../utils/helpers";
import { refreshToken } from "../api/auth";
import { ApiHookResponse } from ".";

type Parameters = [
  getData: (query?: any) => Promise<any>,
  query?: any,
  fetchCondition?: (query: any) => boolean
];

const useApiData = (...params: Parameters): ApiHookResponse => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const [getData, query, fetchCondition] = params;

  useEffect(() => {
    async function fetchData(retryCount = 0) {
      if (fetchCondition && query && !fetchCondition(query)) return;

      setIsLoading(true);
      setError(null);

      try {
        const response: any = await getData(query);
        setData(response?.data);
        setIsLoading(false);
      } catch (error: any) {
        if (getStoredToken() && error.response?.status === 401 && !retryCount) {
          await refreshToken();
          fetchData(retryCount + 1);
        } else {
          logError(error);
          setIsLoading(false);
          setError(error);
        }
      }
    }

    fetchData();
  }, [getData, query, fetchCondition]);

  return { data, isLoading, error };
};

export default useApiData;
