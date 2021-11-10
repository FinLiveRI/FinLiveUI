import { FC } from "react";
import { FileWithPath } from "react-dropzone";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FileItem from "./FileItem";
import { FILE_TYPE_OPTIONS } from "../../utils/constants";

type FileListProps = {
  files: Array<FileWithPath>;
  onDelete: (index: number) => void;
  fileTypes: Array<string>;
  onFileTypeChange: (index: number, type: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
);

const FileList: FC<FileListProps> = (props: FileListProps) => {
  const classes = useStyles();
  const handleDelete = (index: number) =>
    props.onDelete && props.onDelete(index);

  return (
    <Grid
      item
      container
      xs={12}
      sm={6}
      className={classes.root}
      direction="column"
      alignItems="center"
      spacing={2}
    >
      {props.files.map((file: FileWithPath, index: number) => (
        <FileItem
          file={file}
          key={file.name + index}
          onDelete={() => handleDelete(index)}
          fileType={props.fileTypes[index]}
          fileTypeOptions={FILE_TYPE_OPTIONS}
          onFileTypeChange={(value: string) =>
            props.onFileTypeChange(index, value)
          }
        >
          {file.name}
        </FileItem>
      ))}
    </Grid>
  );
};

export default FileList;
