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
import { xKeyObj } from "../../utils/types";

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
  const [query, setQuery] = useState<any>({});
  const [showError, setShowError] = useState<boolean>(false);

  const { data, isLoading, error } = useAnimalData(query);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  const chartXKeys: Array<xKeyObj> = [
    {
      key: "timestamp",
      type: "time",
      plot: "line",
      legend: intl.formatMessage({
        description: "Timestamp axis legend",
        defaultMessage: "day",
      }),
    },
    {
      key: "lactation_period",
      type: "linear",
      plot: "scatter",
      legend: intl.formatMessage({
        description: "Timestamp axis legend",
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
          {data && data.info && !error && !isLoading && (
            <InfoBox
              data={data.info}
              hiddenKeys={Object.keys(data.info).filter(
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
            xKeys={chartXKeys}
            yKey="weight"
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
            xKeys={chartXKeys}
            yKey="totalweight"
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
              { id: "insentec", data: data?.insentec },
              { id: "robot", data: data?.robot },
            ]}
            xKeys={chartXKeys}
            yKey="value"
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
            chartData={[{ id: "feeding duration", data: data?.milk }]}
            xKeys={chartXKeys}
            yKey="totalweight"
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
