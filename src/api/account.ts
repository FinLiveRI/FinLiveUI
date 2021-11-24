import http from "./reqWithAuth";

const url = "/auth/me";

export const getUserData = () => http.get(url);
