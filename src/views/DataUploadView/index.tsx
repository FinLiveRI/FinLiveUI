import { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FileWithPath } from "react-dropzone";
import { Button, MenuItem, Select } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import {
  ContentContainer,
  DropZone,
  ViewHeader,
  FileList,
  Spinner,
} from "../../components";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import FileUploader from "./FileUploader";
import { useUserConfig, useFarms, Farm } from "../../hooks";

const DataUploadView: FC = () => {
  const intl = useIntl();
  const { userConfig, updateUserConfig } = useUserConfig();
  const [farmid, setFarmId] = useState<string>(userConfig.farmid || "");
  const [files, setFiles] = useState<Array<FileWithPath>>([]);
  const [fileTypes, setFileTypes] = useState<Array<string>>([]);
  const [uploaderOpen, setUploaderOpen] = useState<boolean>(false);

  const farmData = useFarms();
  const farms: Array<Farm> = farmData.data;

  const handleFarmChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFarmId(event.target.value as string);
    if (!userConfig.farmid || userConfig.farmid !== event.target.value) {
      updateUserConfig({ ...userConfig, farmid: event.target.value });
    }
  };

  const onDrop = (newFiles: Array<FileWithPath>) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setFileTypes((prev) => [
      ...prev,
      ...newFiles.map((file: FileWithPath) => "animal" as string),
    ]);
  };

  const onFileTypeChange = (index: number, value: string) => {
    setFileTypes((prev) => {
      const newArr: Array<string> = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const uploadClickHandler = () => setUploaderOpen(true);

  const uploaderCloseHandler = () => {
    setUploaderOpen(false);
    setFiles([]);
    setFileTypes([]);
  };

  const handleRemoveFile = (itemIndex: number) => {
    setFiles(
      files.filter((file: FileWithPath, index: number) => itemIndex !== index)
    );
    setFileTypes(
      fileTypes.filter((type: string, index: number) => itemIndex !== index)
    );
  };

  return (
    <ContentContainer spacing={4}>
      <ViewHeader
        title={intl.formatMessage({
          description: "Data Upload View Header",
          defaultMessage: "Data Upload",
        })}
        TitleIcon={UploadIcon}
      />
      <div style={{ marginTop: "1em", marginBottom: "1em" }}>
        {farms && !farmData.isLoading ? (
          <>
            <Select
              value={farmid}
              required
              displayEmpty={!farmid}
              placeholder="Farm Id"
              onChange={handleFarmChange}
              variant="outlined"
              aria-label={intl.formatMessage({
                description: "Farm ID select aria label",
                defaultMessage: "Select Farm",
              })}
            >
              {!farmid && (
                <MenuItem value="">{`<${intl.formatMessage({
                  description: "Empty value for farm selection",
                  defaultMessage: "Select Farm",
                })}> *`}</MenuItem>
              )}
              {farms.map((farm: Farm, index: number) => (
                <MenuItem key={index} value={farm.farmid}>
                  {`${farm.farmid} ${farm.name}`}
                </MenuItem>
              ))}
            </Select>
          </>
        ) : (
          <Spinner
            withText={true}
            size={30}
            text={intl.formatMessage({
              description: "Farm options loading message",
              defaultMessage: "Loading farms...",
            })}
            textVariant="subtitle1"
          />
        )}
      </div>
      <DropZone onDrop={onDrop} width="50vw" height="50vh" />
      <FileList
        files={files}
        onDelete={handleRemoveFile}
        fileTypes={fileTypes}
        onFileTypeChange={onFileTypeChange}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!files.length || !farmid}
        startIcon={<CloudUpload />}
        onClick={uploadClickHandler}
      >
        <FormattedMessage
          description="Upload button text"
          defaultMessage="Upload"
        />
      </Button>
      {uploaderOpen ? (
        <FileUploader
          open={uploaderOpen}
          onClose={uploaderCloseHandler}
          files={files}
          filetypes={fileTypes}
          farmid={farmid}
        />
      ) : (
        <div />
      )}
    </ContentContainer>
  );
};

export default DataUploadView;
