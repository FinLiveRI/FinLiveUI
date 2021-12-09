import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import moment, { Moment } from "moment";
import { Button, Grid, MenuItem, Select, TextField } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CloudDownload, Search } from "@material-ui/icons";
import { DateRangePicker, Spinner } from "../../components";
import { AnimalDataQuery, downloadAnimalData } from "../../api/animal";
import { useUserConfig, useFarms, Farm, useAnimals, Animal } from "../../hooks";

type SearchFormProps = {
  onSearch: (data: AnimalDataQuery) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(1),
      },
    },
    dropdownContainer: {
      marginLeft: "2vw",
      [theme.breakpoints.down("md")]: {
        marginLeft: "0",
        marginTop: "2vw",
      },
    },
    dropdown: {
      width: "100%",
    },
    buttonRow: {
      [theme.breakpoints.down("md")]: {
        marginTop: theme.spacing(1),
      },
    },
  })
);

const SearchForm = (props: SearchFormProps): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const { userConfig, updateUserConfig } = useUserConfig();
  const [id, setId] = useState<string>("");
  const [farmid, setFarmId] = useState<string>(userConfig.farmid || "");
  const [startDate, setStartDate] = useState<Moment | null>(
    moment().subtract({ years: 1 })
  );
  const [endDate, setEndDate] = useState<Moment | null>(moment());

  const farmData = useFarms();
  const farms: Array<Farm> = farmData.data;

  const animalData = useAnimals();
  const animals : Array<Animal> = animalData.data;
  
  const handleFarmChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFarmId(event.target.value as string);
    if (!userConfig.farmid || userConfig.farmid !== event.target.value) {
      updateUserConfig({ ...userConfig, farmid: event.target.value });
    }
  };

  const handleAnimalChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setId(event.target.value as string);
  };

  const handleSearch = () =>
    props.onSearch({
      animalid: id,
      farmid,
      begin: startDate?.format("YYYY-MM-DD") || "",
      end: endDate?.format("YYYY-MM-DD") || "",
    });

  const handleDownload = () =>
    downloadAnimalData({
      animalid: id,
      farmid,
      begin: startDate?.format("YYYY-MM-DD") || "",
      end: endDate?.format("YYYY-MM-DD") || "",
    });

  const validateDates = (): boolean =>
    startDate && endDate && startDate.isBefore(endDate) ? true : false;

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
          container
          item
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          lg={12}
          xl={12}
        >
          <Grid item xs={12} lg={4} xl={5}>
          {animals && !animalData.isLoading ? (
            <Select
              value={id}
              required
              fullWidth
              displayEmpty={!id}
              onChange={handleAnimalChange}
              variant="outlined"
              aria-label={intl.formatMessage({
                description: "Animal SearchInput label",
                defaultMessage: "Animal ID",
              })}
            >
              {!id && (
                  <MenuItem value="">{`<${intl.formatMessage({
                    description: "Empty value for animal selection",
                    defaultMessage: "Select Animal",
                  })}> *`}</MenuItem>
                )}
              {animals
              .map((animal: Animal, index: number) => (
                <MenuItem key={index} value={animal.animalid}>
                  {`${animal.animalid} ${animal.name} ${animal.euid}`}
                </MenuItem>
              ))}
            </Select>
          ) : ( 
            <Spinner withText={false} size={30} />
          )}
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            xl={5}
            className={classes.dropdownContainer}
          >
            {farms && !farmData.isLoading ? (
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
            ) : (
              <Spinner withText={false} size={30} />
            )}
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          spacing={0}
          xs={12}
          justifyContent="flex-start"
        >
          <Grid item xs={9} lg={7} xl={7}>
            <DateRangePicker
              required
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
            xs={12}
            lg={5}
            xl={5}
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
                disabled={!id || !farmid || !validateDates()}
                startIcon={<Search />}
                onClick={handleSearch}
              >
                <FormattedMessage
                  description="Search Button label"
                  defaultMessage="Search"
                />
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                disabled={!id || !farmid || !validateDates()}
                startIcon={<CloudDownload />}
                onClick={handleDownload}
              >
                <FormattedMessage
                  description="Download CSV Button label"
                  defaultMessage="Download"
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForm;
