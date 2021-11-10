import { useContext } from "react";
import { UserConfigContext } from "../context";

const useUserConfig = () => useContext(UserConfigContext);

export default useUserConfig;
