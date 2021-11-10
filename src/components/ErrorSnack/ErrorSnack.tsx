import { FC } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { FormattedMessage } from "react-intl";

type ErrorSnackProps = {
  open: boolean;
  handleClose: () => void;
  error?: any;
};

const ErrorSnack: FC<ErrorSnackProps> = (props: ErrorSnackProps) => {
  return (
    <Snackbar open={props.open} onClose={props.handleClose}>
      <Alert onClose={props.handleClose} severity="error">
        <AlertTitle>
          <FormattedMessage
            description="Error snack title"
            defaultMessage="Error"
          />
        </AlertTitle>
        {props.error?.response?.data?.message || props.error?.message || (
          <FormattedMessage
            description="Generic error message"
            defaultMessage="Something went wrong"
          />
        )}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnack;
