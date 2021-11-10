import { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDropzone, FileWithPath } from "react-dropzone";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Description } from "@material-ui/icons";

type DropZoneProps = {
  onDrop: (files: Array<FileWithPath>) => any;
  width?: string;
  height?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropZone: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2em",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: "white",
      color: "#bdbdbd",
      fontSize: "2em",
      outline: "none",
      transition: "border .24s ease-in-out",
      "&:hover": {
        borderColor: theme.palette.secondary.main,
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      },
      "&:focus": {
        borderColor: theme.palette.secondary.main,
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      },
    },
    dropZoneDragged: {
      borderColor: theme.palette.primary.main,
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    },
    instructionText: {
      WebkitUserSelect: "none",
      userSelect: "none",
    },
  })
);

const DropZone: FC<DropZoneProps> = (props: DropZoneProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const onDrop = (files: Array<FileWithPath>) => {
    props.onDrop(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const style = {
    width: props.width || "50vw",
    minHeight: props.height || "50vh",
  };

  const rootClassName: string = isDragActive
    ? `${classes.dropZone} ${classes.dropZoneDragged}`
    : classes.dropZone;

  return (
    <div
      {...getRootProps({ style })}
      className={rootClassName}
      role="button"
      aria-label={intl.formatMessage({
        description: "ARIA label for clickable dropzone for files",
        defaultMessage: "Click to select files",
      })}
    >
      <input {...getInputProps()} />
      <Description fontSize="large" />
      <p className={classes.instructionText}>
        {isDragActive ? (
          <FormattedMessage
            description="DropZone on file drag message"
            defaultMessage="Drop the files here..."
          />
        ) : (
          <FormattedMessage
            description="DropZone instruction message"
            defaultMessage="Drag files here, or click to browse"
          />
        )}
      </p>
    </div>
  );
};

export default DropZone;
