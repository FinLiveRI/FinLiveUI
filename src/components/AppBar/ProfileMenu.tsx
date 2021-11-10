import { MouseEventHandler } from "react";
import { Menu, Button, Typography, Grid } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import { logout } from "../../api/auth";

type ProfileMenuProps = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  handleClose: MouseEventHandler<HTMLElement>;
  nameText: string;
  organization: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileIcon: {
      fontSize: "4em",
    },
  })
);

const ProfileMenu: React.FC<ProfileMenuProps> = (props: ProfileMenuProps) => {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.isOpen}
      onClose={props.handleClose}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        style={{ padding: "0 1vw 1vw 1vw" }}
      >
        <Grid item>
          <AccountCircle color="primary" className={classes.profileIcon} />
        </Grid>
        <Grid item>
          <Typography align="center">{props.nameText}</Typography>
        </Grid>
        <Grid item>
          <Typography align="center">{props.organization}</Typography>
        </Grid>
      </Grid>
      <Button
        color="secondary"
        fullWidth
        onClick={logout}
        variant="contained"
        style={{ width: "80%", marginLeft: "10%" }}
      >
        <FormattedMessage
          description="Logout button text"
          defaultMessage="Logout"
        />
      </Button>
    </Menu>
  );
};

export default ProfileMenu;
