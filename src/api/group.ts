import http from "./request";
import useMock from "../mock/group/api";

const url = "/group";

export type GroupDataQuery = {
  calvingnumber: string;
  farmid: string;
  begin: string;
  end: string;
};

const getGroup = (query: GroupDataQuery) => {
  return http.get(`${url}`, { headers: { "x-filter": JSON.stringify(query) } });
};

export const getGroupData = process.env.API
  ? getGroup
  : async (query: GroupDataQuery) => useMock(query);
