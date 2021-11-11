import http from "./request";
import useMock from "../mock/group/api";

const url = "/group";

export type GroupDataQuery = {
  calvingnumber: string;
  farmid?: string;
  startDate?: string;
  endDate?: string;
};

const getGroup = (query: GroupDataQuery) => {
  return http.get(`${url}/${query.calvingnumber}`, {
    params: query,
  });
};

export const getGroupData = process.env.API
  ? getGroup
  : async (query: GroupDataQuery) => useMock(query);
