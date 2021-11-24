import { getStoredOrgId } from "../utils/helpers";
import http from "./reqWithAuth";

const url = "/management/barns";

export const getFarms = () =>
  http.get(url, { headers: { "x-org": getStoredOrgId() } });
