import { FC } from 'react';
import { FileWithPath } from 'react-dropzone';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FileItem from './FileItem';

type FileListProps = {
  files: Array<FileWithPath>,
  onDelete?: (index: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    }
  })
);

const FileList: FC<FileListProps> = (props: FileListProps) => {
  const classes = useStyles();
  const handleDelete = (index: number) => props.onDelete && props.onDelete(index);

  return (
    <Grid item container xs={12} sm={6} className={classes.root} direction="column" alignItems="center" spacing={2}>
      {props.files.map((file: FileWithPath, index: number) => (
        <FileItem file={file} key={file.name + index} onDelete={()=>handleDelete(index)}>
          {file.name}
        </FileItem>
      ))}
    </Grid>
  );
}

export default FileList;