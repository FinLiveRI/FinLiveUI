import { ReactChild } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks";

type PrivateRouteProps = {
  children: ReactChild | Array<ReactChild>;
  [key: string]: any;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = useAuth();
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
