import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl'
import { Moment } from 'moment';
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  CloudDownload,
  Search
} from '@material-ui/icons';
import { FARM_OPTIONS } from '../../utils/constants';
import { DateRangePicker } from '../../components';
import { AnimalDataQuery } from '../../api/animal';


type SearchFormProps = {
  onSearch: (data: AnimalDataQuery) => void
};

type FarmItem = {
  id: string,
  name: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(1)
      }
    },
    dropdownContainer: {
      marginLeft: "2vw",
      [theme.breakpoints.down('md')]: {
        marginLeft: "0",
        marginTop: "2vw"
      }
    },
    dropdown: {
      width: "100%"
    },
    buttonRow: {
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(1)
      },
    }
  }),
);


const SearchForm = (props: SearchFormProps): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const [id, setId] = useState<string>("");
  const [farmid, setFarmId] = useState<string>("1");
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleFarmChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFarmId(event.target.value as string);
  };

  const handleSearch = () => props.onSearch(
    {
      id, 
      farmid, 
      startDate: startDate?.format('YYYY-MM-DD'), 
      endDate: endDate?.format('YYYY-MM-DD')
    }
  );

  const validateDates = (): boolean => startDate && endDate 
    ? startDate.isBefore(endDate) 
    : true
  ;

  return (
    <>
      <Grid 
        container 
        direction="row" 
        justifyContent="center" 
        alignItems="center" 
        spacing={2} 
        className={classes.root}
      >
        <Grid 
          container item 
          direction="row" 
          justifyContent="flex-start" 
          alignItems="center" 
          xs={12} lg={12} xl={12}
        >
          <Grid item xs={12} lg={4} xl={5}>
            <TextField
              value={id}
              required
              fullWidth
              variant="outlined"
              onChange={handleIdChange}
              label={intl.formatMessage({
                description: "Animal SearchInput label", 
                defaultMessage: "ID"
              })} 
            />
          </Grid>
          <Grid item xs={12} lg={6} xl={5} className={classes.dropdownContainer}>
            <Select
              variant="outlined"
              value={farmid} 
              placeholder="Farm Id" 
              onChange={handleFarmChange} 
              className={classes.dropdown}
            >
              {FARM_OPTIONS.map((farm: FarmItem, index: number) => (
                <MenuItem 
                  key={index} 
                  value={farm.id}
                >
                  {`${farm.id} ${farm.name}`}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={0} xs={12} justifyContent="flex-start">
          <Grid item xs={9} lg={7} xl={7}>
            <DateRangePicker
              error={!validateDates()}
              startDate={startDate}
              endDate={endDate}
              handleStartChange={setStartDate}
              handleEndChange={setEndDate}
            />
          </Grid>
          <Grid 
            item 
            container 
            xs={12} lg={5} xl={5} 
            spacing={2} 
            direction="row" 
            justifyContent="center" 
            alignItems="center" 
            className={classes.buttonRow}
          >
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                disabled={!id || !validateDates()}
                startIcon={<Search />}
                onClick={handleSearch}
              >
                <FormattedMessage description="Search Button label" defaultMessage="Search" />
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                disabled={!id || !validateDates()}
                startIcon={<CloudDownload />}
                onClick={()=>null}
              >
                <FormattedMessage description="Download CSV Button label" defaultMessage="Download" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchForm;