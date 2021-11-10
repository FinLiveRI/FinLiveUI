import { createContext, ReactChild, useState } from "react";

export type UserConfig = {
  farmid?: string;
};

type UserConfigProviderProps = {
  config: UserConfig;
  children: ReactChild | Array<ReactChild>;
};

export const UserConfigContext = createContext<any>(null);

export const UserConfigProvider = (props: UserConfigProviderProps) => {
  const [userConfig, setUserConfig] = useState(props.config);

  const updateUserConfig = (newConfig: UserConfig) => {
    localStorage.setItem("userConfig", JSON.stringify(newConfig));
    setUserConfig(newConfig);
  };

  return (
    <UserConfigContext.Provider value={{ userConfig, updateUserConfig }}>
      {props.children}
    </UserConfigContext.Provider>
  );
};
