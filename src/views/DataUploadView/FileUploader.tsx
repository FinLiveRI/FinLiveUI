import {
  FC,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactElement,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  Typography,
  Grid,
} from "@material-ui/core";
import { FileWithPath } from "react-dropzone";
import { uploadFile } from "../../api/fileupload";
import { ProgressBar, ProgressBarProps } from "../../components";
import { FormattedMessage, useIntl } from "react-intl";
import { Alert } from "@material-ui/lab";

type ProgressInfo = {
  percentage: number;
  fileName: string;
  error?: boolean;
};

type FileUploaderProps = {
  files: Array<FileWithPath>;
  filetypes: Array<string>;
  farmid: string;
  open: boolean;
  onClose: () => void;
};

const FileUploader: FC<FileUploaderProps> = (props: FileUploaderProps) => {
  const [infos, setInfos] = useState<Array<ProgressInfo>>([]);
  const [messages, setMessages] = useState<Array<string>>([]);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [finished, setFinished] = useState<boolean>(false);
  const infoRef = useRef<any>(null);
  const intl = useIntl();

  const handleClose = () => {
    if (finished) {
      props.onClose();
    }
  };

  const uploadFiles = useCallback(() => {
    const progressInfo = props.files.map((file: FileWithPath) => ({
      percentage: 0,
      fileName: file.name,
    }));
    infoRef.current = {
      val: progressInfo,
    };

    const upload = (index: number, file: FileWithPath) => {
      let info = [...infoRef.current.val];

      return uploadFile(
        file,
        props.filetypes[index],
        props.farmid,
        (event: ProgressEvent) => {
          info[index].percentage = Math.round(
            (100 * event.loaded) / event.total
          );
          setInfos(() => [...info]);
        }
      )
        .then(() => {
          const message: string =
            intl.formatMessage({
              description: "File upload success feedback",
              defaultMessage: "Succesfully uploaded",
            }) + ` ${file.name}`;
          setMessages((prev) => [...prev, message]);
        })
        .catch(() => {
          const message: string =
            intl.formatMessage({
              description: "File upload failure feedback",
              defaultMessage: "Failed to upload",
            }) + ` ${file.name}`;
          info[index].percentage = 0;
          info[index].error = true;
          setInfos(info);
          setErrors((prev) => [...prev, message]);
        });
    };

    const promises = props.files.map((file: FileWithPath, index: number) =>
      upload(index, file)
    );

    Promise.all(promises).then(() => setFinished(true));
  }, [props.farmid, props.files, props.filetypes, intl]);

  useEffect(() => {
    if (props.open && !finished) {
      uploadFiles();
    }
  }, [props.open, finished, uploadFiles]);

  const progressBars: Array<ReactElement> = props.files.map(
    (file: FileWithPath, index: number) => {
      const progressBarProps: ProgressBarProps = {
        color: "primary",
        value: infos[index] ? infos[index].percentage : 0,
        variant: infos[index] ? "determinate" : "indeterminate",
      };

      return (
        <Grid item key={file.name + index} style={{ width: "80%" }}>
          <Typography>{file.name}</Typography>
          {infos[index] && infos[index].error ? (
            <Typography color="error">Error uploading file</Typography>
          ) : (
            <ProgressBar {...progressBarProps} />
          )}
        </Grid>
      );
    }
  );

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <FormattedMessage
          description="File uploader modal title"
          defaultMessage="Upload in progress"
        />
      </DialogTitle>
      <DialogContent dividers style={{ height: "auto" }}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          {progressBars}
        </Grid>
        {messages.length || errors.length ? (
          <Grid
            container
            direction="column"
            spacing={1}
            style={{ marginTop: "5em" }}
          >
            {messages.map((message: string, index: number) => (
              <Grid item key={index}>
                <Alert severity="success">{message}</Alert>
              </Grid>
            ))}
            {errors.map((message: string, index: number) => (
              <Grid item key={index}>
                <Alert severity="error">{message}</Alert>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onClose}
          disabled={!finished}
        >
          <FormattedMessage
            description="Upload finish button text"
            defaultMessage="Finish"
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploader;
