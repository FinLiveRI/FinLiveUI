import fileDownload from "js-file-download";
import http from "./reqWithAuth";
import useMock from "../mock/group/api";
import { getStoredOrgId } from "../utils/helpers";

const url = "/charts/group";
const downloadUrl = "/charts/group/download";

export type GroupDataQuery = {
  calvingnumber: string;
  farmid: string;
  begin: string;
  end: string;
};

const getGroup = (query: GroupDataQuery) => {
  return http.get(`${url}`, {
    headers: { "x-filter": JSON.stringify(query), "x-org": getStoredOrgId() },
  });
};

const downloadGroupCsv = (query: GroupDataQuery) => {
  return http
    .get(`${downloadUrl}`, {
      responseType: "blob",
      headers: { "x-filter": JSON.stringify(query), "x-org": getStoredOrgId() },
    })
    .then((response) => {
      fileDownload(response.data, `${query.calvingnumber}.csv`);
    });
};

export const getGroupData = process.env.REACT_APP_API
  ? getGroup
  : async (query: GroupDataQuery) => useMock(query);

export const downloadGroupData = process.env.REACT_APP_API
  ? downloadGroupCsv
  : async (query: GroupDataQuery) => null;
