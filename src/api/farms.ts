import http from "./request";

const url = "/management/barns";

export const getFarms = () => http.get(url);
