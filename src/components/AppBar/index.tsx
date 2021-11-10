import { useState, useEffect, MouseEvent, FC } from "react";
import {
  AppBar as MuiAppBar,
  IconButton,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useIntl } from "react-intl";
import { useAuth, useUserData } from "../../hooks";
import ProfileMenu from "./ProfileMenu";
import UserMessage from "./UserMessage";
import TabBar from "./TabBar";
import { ErrorSnack } from "..";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      userSelect: "none",
      fontFamily: '"Knewave", cursive',
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    buttonSection: {
      display: "flex",
      width: "10%",
      [theme.breakpoints.up("md")]: {
        width: "inherit",
      },
    },
    buttonIcon: {
      fontSize: "36px",
    },
    tabIcon: {
      fill: "white",
    },
    userMessage: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
  })
);

const AppBar: FC = () => {
  const classes = useStyles();
  const user = useAuth().currentUser;
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const isMenuOpen = !!anchorEl;

  const { data, isLoading, error } = useUserData();
  const userData: any = data ? data[0]?.user : null;

  useEffect(() => {
    setShowError(true);
  }, [error]);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={classes.grow}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            FinLive
          </Typography>
          <div className={classes.grow}>{user && <TabBar />}</div>
          {user && (
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={4}
              className={classes.buttonSection}
            >
              <Grid item className={classes.userMessage}>
                <UserMessage
                  name={
                    userData
                      ? `${userData.first_name} ${userData.last_name}`
                      : undefined
                  }
                />
              </Grid>
              <Grid item>
                <IconButton
                  edge="end"
                  aria-label={intl.formatMessage({
                    description: "Aria label for Profile icon",
                    defaultMessage: "Profile",
                  })}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  className="menuButton"
                >
                  <AccountCircle className={classes.buttonIcon} />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </MuiAppBar>
      {user && (
        <ProfileMenu
          anchorEl={anchorEl}
          isOpen={isMenuOpen}
          handleClose={handleMenuClose}
          nameText={
            userData
              ? userData.first_name + " " + userData.last_name
              : "unknown"
          }
          organization={
            userData && userData.organization
              ? userData.organization
              : "unknown organization"
          }
        />
      )}
      {!isLoading && error && (
        <ErrorSnack
          open={showError}
          handleClose={() => setShowError(false)}
          error={error}
        />
      )}
    </nav>
  );
};

export default AppBar;
