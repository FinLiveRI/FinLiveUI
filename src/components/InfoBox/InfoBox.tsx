import { useState, FC } from 'react';
import { 
  Grid,
  IconButton,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
} from "@material-ui/core";
import {
  ArrowDownward,
  ArrowUpward
} from '@material-ui/icons';

type InfoObject = {
  [key: string]: string
}

type InfoBoxProps = {
  data: InfoObject,
  hiddenKeys?: Array<string>
}

const capitalizeString = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const cleanDataKey = (name: string): string => name
  .split('_')
  .map(capitalizeString)
  .join(' ')

const InfoBox: FC<InfoBoxProps> = (props: InfoBoxProps) => {

  const [open, setOpen] = useState<boolean>(false);

  const getTableRow = (key: string, index: number) => (
    <TableRow key={index}>
      <TableCell><b>{`${cleanDataKey(key)}`}</b></TableCell>
      <TableCell>{props.data[key] || '-'}</TableCell>
    </TableRow>
  );

  if(!props.data) return null;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" align="center" style={{paddingTop: "0.5em"}}>Basic Info</Typography>
      <Table size="small">
        <TableBody>
          {
            Object.keys(props.data)
              .filter(key => !props.hiddenKeys?.includes(key))
              .map(getTableRow)
          }
          {
            open && props.hiddenKeys?.map(getTableRow)
          }
        </TableBody>
      </Table>
      <Grid item container direction="row" justifyContent="center">
      { props.hiddenKeys?.length
        ? open 
          ? <IconButton onClick={()=>setOpen(false)}><ArrowUpward /></IconButton>
          : <IconButton onClick={()=>setOpen(true)}><ArrowDownward /></IconButton>
        : null
      }
      </Grid>
    </TableContainer>
  )
}

export default InfoBox;