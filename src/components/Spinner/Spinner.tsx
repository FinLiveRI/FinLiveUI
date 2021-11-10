import {
  CircularProgress,
  Typography,
  TypographyVariant,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

type SpinnerProps = {
  withText?: boolean;
  size?: number;
  text?: string;
  textVariant?: TypographyVariant;
} & typeof defaultProps;

const defaultProps = {
  withText: true,
  size: 60,
  textVariant: "h3",
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "2vh",
    },
  })
);

const Spinner = (props: SpinnerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.withText && (
        <Typography variant={props.textVariant}>
          {props.text || (
            <FormattedMessage
              description="Loading text"
              defaultMessage="Loading..."
            />
          )}
        </Typography>
      )}
      <CircularProgress color="secondary" size={props.size} />
    </div>
  );
};

Spinner.defaultProps = defaultProps;

export default Spinner;
