import { FC } from 'react';
import {
  Button,
  ButtonGroup
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

export type DateButtonOption = "day" | "week";

type DateButtonGroupProps = {
  value: DateButtonOption,
  onChange: (value: DateButtonOption) => void
}

export const DateButtonGroup: FC<DateButtonGroupProps> = (props: DateButtonGroupProps) => {
  return (
    <ButtonGroup variant="outlined">
      <Button 
        color={props.value === "day" ? "primary" : undefined} 
        onClick={()=>props.onChange("day")}
      >
        <FormattedMessage description="Day chart option button text" defaultMessage="Day" />
      </Button>
      <Button 
        color={props.value === "week" ? "primary" : undefined} 
        onClick={()=>props.onChange("week")}
      >
        <FormattedMessage description="Week chart option button text" defaultMessage="Week" />
      </Button>
    </ButtonGroup>
  );
}

