import { getGroupData, GroupDataQuery } from "../api/group";
import { ApiHookResponse, useApiData } from ".";

const fetchCondition = (query: GroupDataQuery): boolean =>
  !!query.calvingnumber;

const useGroupData = (query: GroupDataQuery): ApiHookResponse => {
  const response: ApiHookResponse = useApiData(
    getGroupData,
    query,
    fetchCondition
  );

  return response;
};

export default useGroupData;
