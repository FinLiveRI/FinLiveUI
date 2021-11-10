import React, { useState, FC } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import { login } from "../../api/auth";
import theme from "../../theme";
import { AxiosError } from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderColor: theme.palette.primary.main,
      borderStyle: "solid",
      borderWidth: "0.3em",
      borderRadius: "3em",
      boxShadow:
        "0 0.3em 0.3em 0 rgba(0, 0, 0, 0.16), 0 0 0 0.2em rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
    },
    formContainer: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      width: "30vw",
      minWidth: "400px",
      maxWidth: "600px",
    },
    inputContainer: {
      width: "100%",
    },
  })
);

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const classes = useStyles(theme);

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const authError = await login({ username, password });

    if (authError) {
      setError(authError);
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleLogin}>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
          className={classes.formContainer}
          role="form"
        >
          <Grid item>
            {!loading ? (
              <Typography variant="h3">
                <FormattedMessage
                  description="Login form header"
                  defaultMessage="Login"
                />
              </Typography>
            ) : (
              <CircularProgress color="secondary" size={60} thickness={5} />
            )}
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField
              value={username}
              required
              fullWidth
              name="email"
              type="email"
              onChange={handleUserChange}
              variant="outlined"
              label={
                <FormattedMessage
                  description="Email input label"
                  defaultMessage="Email"
                />
              }
            />
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField
              value={password}
              fullWidth
              required
              onChange={handlePasswordChange}
              name="password"
              type="password"
              variant="outlined"
              label={
                <FormattedMessage
                  description="Password input label"
                  defaultMessage="Password"
                />
              }
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" justifyContent="center">
              <Button
                color="primary"
                variant="contained"
                disabled={!username || !password || loading}
                type="submit"
              >
                <FormattedMessage
                  description="Login button text"
                  defaultMessage="Login"
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {error && <Alert severity="error">{error.response?.data?.error}</Alert>}
      </form>
    </div>
  );
};

export default LoginForm;
