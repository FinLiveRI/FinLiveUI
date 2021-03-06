import { useState, useEffect, FC } from "react";
import { useIntl } from "react-intl";
import { Grid, Divider } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ContentContainer,
  InfoBox,
  ViewHeader,
  ChartItem,
  Spinner,
  ErrorSnack,
} from "../../components";
import { ReactComponent as CowIcon } from "../../assets/icons/cow.svg";
import { MAIN_BASIC_INFO_KEYS } from "../../utils/constants";
import { useAnimalData } from "../../hooks";
import SearchForm from "./SearchForm";
import { AnimalChart, xKeyObj } from "../../utils/types";
import { AnimalDataQuery } from "../../api/animal";

type AnimalChartResponse = {
  data: AnimalChart | null;
  isLoading: boolean;
  error: any;
};

const useStyles = makeStyles(() =>
  createStyles({
    headerPanel: {
      maxWidth: "100%",
    },
    chartListContainer: {
      width: "99vw",
      paddingLeft: "0.2vw",
      paddingRight: "0.2vw",
    },
    spinnerContainer: {
      minWidth: "30vw",
      minHeight: "30vh",
      marginTop: "20vh",
    },
    divider: {
      width: "100%",
    },
  })
);

const AnimalView: FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [query, setQuery] = useState<AnimalDataQuery>({
    euid: "",
    farmid: "",
    begin: "",
    end: "",
  });
  const [showError, setShowError] = useState<boolean>(false);

  const { data, isLoading, error }: AnimalChartResponse = useAnimalData(query);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  const durationXKeys: Array<xKeyObj> = [
    {
      key: "visit_day",
      type: "time",
      plot: "line",
      legend: intl.formatMessage({
        description: "Visit day axis legend",
        defaultMessage: "Visit day",
      }),
    },
    {
      key: "lactation",
      type: "linear",
      plot: "scatter",
      legend: intl.formatMessage({
        description: "Lactation period axis legend",
        defaultMessage: "day",
      }),
    },
  ];

  const feedXKeys: Array<xKeyObj> = [
    {
      key: "day",
      type: "time",
      plot: "line",
      legend: intl.formatMessage({
        description: "Day axis legend",
        defaultMessage: "Day",
      }),
    },
    {
      key: "lactation",
      type: "linear",
      plot: "scatter",
      legend: intl.formatMessage({
        description: "Lactation period axis legend",
        defaultMessage: "day",
      }),
    },
  ];

  const milkXKeys: Array<xKeyObj> = [
    {
      key: "day",
      type: "time",
      plot: "line",
      legend: intl.formatMessage({
        description: "Visit day axis legend",
        defaultMessage: "Visit day",
      }),
    },
    {
      key: "lactation",
      type: "linear",
      plot: "scatter",
      legend: intl.formatMessage({
        description: "Lactation period axis legend",
        defaultMessage: "day",
      }),
    },
  ];

  const weightXKeys: Array<xKeyObj> = [
    {
      key: "day",
      type: "time",
      plot: "line",
      legend: intl.formatMessage({
        description: "Visit day axis legend",
        defaultMessage: "Visit day",
      }),
    },
    {
      key: "lactation",
      type: "linear",
      plot: "scatter",
      legend: intl.formatMessage({
        description: "Lactation period axis legend",
        defaultMessage: "day",
      }),
    },
  ];

  return (
    <ContentContainer>
      <ViewHeader
        title={intl.formatMessage({
          description: "Animal View Header",
          defaultMessage: "Animal",
        })}
        TitleIcon={CowIcon}
      />
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={2}
        className={classes.headerPanel}
      >
        <Grid
          item
          container
          direction="column"
          xs={10}
          lg={7}
          xl={6}
          spacing={0}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <SearchForm onSearch={(qr) => setQuery(qr)} />
          </Grid>
        </Grid>
        <Grid item xs={false} lg={false} xl={1} />
        <Grid item container alignItems="center" xs={10} lg={4} xl={4}>
          {data && data.animal && !error && !isLoading && (
            <InfoBox
              data={data.animal}
              hiddenKeys={Object.keys(data.animal).filter(
                (key) => !MAIN_BASIC_INFO_KEYS.includes(key)
              )}
            />
          )}
        </Grid>
      </Grid>
      <Divider variant="fullWidth" className={classes.divider} />
      {data && !isLoading && !error && (
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          className={classes.chartListContainer}
          xs={12}
        >
          <ChartItem
            title={intl.formatMessage({
              description: "Weight Chart title",
              defaultMessage: "Weight",
            })}
            chartData={[{ id: "weight", data: data?.weight }]}
            xKeys={weightXKeys}
            yKey="weight"
            timestampKey={weightXKeys[0].key}
            yLegend={intl.formatMessage({
              description: "Weight in kg label",
              defaultMessage: "weight (kg)",
            })}
          />
          <ChartItem
            title={intl.formatMessage({
              description: "Total milk title",
              defaultMessage: "Total Milk",
            })}
            chartData={[{ id: "milk", data: data?.milk }]}
            xKeys={milkXKeys}
            yKey="total_milk"
            timestampKey={milkXKeys[0].key}
            yLegend={intl.formatMessage({
              description: "Total milk in kg label",
              defaultMessage: "total milk (kg)",
            })}
          />
          <ChartItem
            title={intl.formatMessage({
              description: "Feed Consumption Chart title",
              defaultMessage: "Feed Consumption",
            })}
            chartData={[
              { id: "feed", data: data?.feed },
              /* { id: "insentec", data: data?.insentec },
              { id: "robot", data: data?.robot }, */
            ]}
            xKeys={feedXKeys}
            yKey="daily_weight"
            timestampKey={feedXKeys[0].key}
            yLegend={intl.formatMessage({
              description: "Consumption in kg label",
              defaultMessage: "consumption (kg)",
            })}
          />
          <ChartItem
            title={intl.formatMessage({
              description: "Feeding duration title",
              defaultMessage: "Feeding Duration",
            })}
            chartData={[{ id: "feeding duration", data: data?.duration }]}
            xKeys={durationXKeys}
            yKey="duration"
            timestampKey={durationXKeys[0].key}
            yLegend={intl.formatMessage({
              description: "Total feeding duration in minutes label",
              defaultMessage: "duration (min)",
            })}
          />
        </Grid>
      )}
      {isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {!isLoading && error && (
        <ErrorSnack
          open={showError}
          handleClose={() => setShowError(false)}
          error={error}
        />
      )}
    </ContentContainer>
  );
};

export default AnimalView;
