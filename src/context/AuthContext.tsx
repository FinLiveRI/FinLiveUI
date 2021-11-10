import { createContext, ReactChild, useState } from "react";

type AuthProviderProps = {
  user: any;
  children: ReactChild | Array<ReactChild>;
};

export const AuthContext = createContext<any>(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(props.user);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
