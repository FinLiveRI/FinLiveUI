import { FC } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

type UserMessageProps = {
  name?: string;
  organization?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userMessage: {
      display: "none",
      userSelect: "none",
      verticalAlign: "middle",
      [theme.breakpoints.up("lg")]: {
        display: "block",
      },
    },
  })
);

const UserMessage: FC<UserMessageProps> = (props: UserMessageProps) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Typography className={classes.userMessage}>
        {!props.name && !props.organization ? (
          <FormattedMessage
            description="Guest user navbar message"
            defaultMessage="Browsing as guest"
          />
        ) : (
          `${props.name || ""}${props.name && props.organization ? " – " : ""}${
            props.organization || ""
          }`
        )}
      </Typography>
    </Grid>
  );
};

export default UserMessage;
