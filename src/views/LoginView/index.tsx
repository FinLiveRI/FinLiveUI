import { FC } from "react";
import { Grid } from "@material-ui/core";
import { Redirect, useLocation } from "react-router-dom";
import { ContentContainer } from "../../components";
import { useAuth } from "../../hooks";
import LoginForm from "./LoginForm";

type LocationState = {
  state: {
    from: {
      pathname: string;
    };
  };
};

const LoginView: FC = () => {
  const auth = useAuth();
  const location: LocationState = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  if (auth.currentUser) return <Redirect to={from.pathname} />;

  return (
    <ContentContainer>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <LoginForm />
      </Grid>
    </ContentContainer>
  );
};

export default LoginView;
