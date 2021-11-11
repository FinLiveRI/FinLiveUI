import http from "./request";

const url = "/management/account";

export const getUserData = () => http.get(url);
