import { FC } from "react";
import moment, { Moment } from "moment";
import { useIntl } from "react-intl";
import { Grid } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

type DateRangePickerProps = {
  startDate: Moment | null;
  endDate: Moment | null;
  handleStartChange: (date: Moment | null) => any;
  handleEndChange: (date: Moment | null) => any;
  error?: boolean;
  required?: boolean;
};

const DateRangePicker: FC<DateRangePickerProps> = (
  props: DateRangePickerProps
) => {
  const intl = useIntl();

  const datePickerFormatText = intl.formatMessage({
    description:
      "DatePicker date format string - change format/order but do not translate",
    defaultMessage: "YYYY-MM-DD",
  });

  const datePickerLabel = intl.formatMessage({
    description: "DatePicker date format label - translate freely",
    defaultMessage: "YYYY-MM-DD",
  });

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={6} lg={6} xl={6}>
        <KeyboardDatePicker
          autoOk
          clearable
          disableFuture
          format={datePickerFormatText}
          placeholder={datePickerLabel}
          error={props.error}
          variant="dialog"
          inputVariant="outlined"
          aria-required={props.required}
          required={props.required}
          value={props.startDate}
          KeyboardButtonProps={{
            "aria-label": intl.formatMessage({
              description: "Start Date button aria label",
              defaultMessage: "Open start date picker",
            }),
            size: "small",
          }}
          onChange={(date) =>
            props.handleStartChange(date ? moment(date) : null)
          }
          label={intl.formatMessage({
            description: "Start Date input label",
            defaultMessage: "Start Date",
          })}
        />
      </Grid>
      <Grid item xs={6} lg={6} xl={6}>
        <KeyboardDatePicker
          autoOk
          clearable={true}
          disableFuture
          format={datePickerFormatText}
          placeholder={datePickerLabel}
          error={props.error}
          variant="dialog"
          inputVariant="outlined"
          required={props.required}
          aria-required={props.required}
          value={props.endDate}
          KeyboardButtonProps={{
            "aria-label": intl.formatMessage({
              description: "End Date button aria label",
              defaultMessage: "Open end date picker",
            }),
            size: "small",
          }}
          onChange={(date) => props.handleEndChange(date ? moment(date) : null)}
          label={intl.formatMessage({
            description: "End Date input label",
            defaultMessage: "End Date",
          })}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
