import { FC } from "react";
import { FileWithPath } from "react-dropzone";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Description, Close } from "@material-ui/icons";
import { humanFileSize } from "../../utils/helpers";
import { useIntl } from "react-intl";

type FileItemProps = {
  file: FileWithPath;
  fileType: string;
  fileTypeOptions: Array<string>;
  onFileTypeChange: (value: string) => void;
  onDelete?: (file: FileWithPath) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: "1.2em",
    },
    lastModifed: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
  })
);

const FileList: FC<FileItemProps> = (props: FileItemProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.file);
    }
  };

  const handleFileTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    props.onFileTypeChange(event.target.value as string);
  };

  return (
    <Grid
      container
      item
      direction="row"
      spacing={2}
      className={classes.root}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Grid item xs={1}>
        <Description color="secondary" />
      </Grid>
      <Grid item xs={4}>
        {props.file.name}
      </Grid>

      <Grid item xs={2}>
        {humanFileSize(props.file.size)}
      </Grid>
      <Grid item xs={3}>
        <InputLabel id="label">File type</InputLabel>
        <Select
          fullWidth
          value={props.fileType || "animal"}
          placeholder="File type"
          labelId="label"
          onChange={handleFileTypeChange}
        >
          {props.fileTypeOptions.map((type: string, index: number) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {props.onDelete && (
        <Grid item xs={1}>
          <IconButton
            color="default"
            onClick={handleDelete}
            aria-label={
              intl.formatMessage({
                description: "Aria button label for removing file from list",
                defaultMessage: "Remove",
              }) +
              " " +
              props.file.name
            }
          >
            <Close />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default FileList;
