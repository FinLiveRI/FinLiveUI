import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { FileWithPath } from 'react-dropzone'
import { Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import {
  ContentContainer,
  DropZone,
  ViewHeader,
  FileList
} from '../../components';
import {ReactComponent as UploadIcon} from '../../assets/icons/upload.svg';

const DataUploadView: FC = () => {
  const intl = useIntl();
  const [files, setFiles] = useState<Array<FileWithPath>>([]);

  const onDrop = (newFiles: Array<FileWithPath>) => {
    setFiles([...files, ...newFiles]);
  }

  const handleRemoveFile = (itemIndex: number) => setFiles(files.filter((file ,index: number) => itemIndex !== index));

  return (
    <ContentContainer spacing={4}>
      <ViewHeader 
        title={intl.formatMessage({
          description: "Data Upload View Header", 
          defaultMessage: "Data Upload"
        })}
        TitleIcon={UploadIcon}
      />
      <DropZone 
        onDrop={onDrop}
        width="50vw"
        height="50vh"
      />
      <FileList files={files} onDelete={handleRemoveFile} />
      <Button variant="contained" color="primary" disabled={!files.length} startIcon={<CloudUpload />}>
        <FormattedMessage description="Upload button text" defaultMessage="Upload" />
      </Button>
    </ContentContainer>
  )
}

export default DataUploadView;