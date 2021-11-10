import { FC, ChangeEvent } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

type KeySelectionProps = {
  value: string;
  keys: Array<string>;
  onChange: (value: string) => void;
};

const KeySelection: FC<KeySelectionProps> = (props: KeySelectionProps) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) =>
    props.onChange(event.target.value as string);

  if (!props.keys.includes(props.value)) return null;

  return (
    <FormControl>
      <InputLabel id="xkey-select-label">
        <FormattedMessage
          description="X Axis Select label"
          defaultMessage="X-Axis"
        />
      </InputLabel>
      <Select
        labelId="xkey-select-label"
        value={props.value}
        onChange={handleChange}
      >
        {props.keys.map((key: string, index: number) => (
          <MenuItem key={key + index} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default KeySelection;
