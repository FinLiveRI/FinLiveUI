import http from "./request";

const url = "/auth/me";

export const getUserData = () => http.get(url);
