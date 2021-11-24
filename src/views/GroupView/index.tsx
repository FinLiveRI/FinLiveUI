import { useState, useEffect, FC } from "react";
import { useIntl } from "react-intl";
import { Grid, Divider } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ContentContainer,
  InfoBox,
  ViewHeader,
  ErrorSnack,
  ChartItem,
  Spinner,
} from "../../components";
import { useGroupData } from "../../hooks";
import { ReactComponent as GroupIcon } from "../../assets/icons/group.svg";
import GroupSearchForm from "./GroupSearchForm";
import { Animal, xKeyObj } from "../../utils/types";
import { GroupDataQuery } from "../../api/group";

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

const GroupView: FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [query, setQuery] = useState<GroupDataQuery>({ calvingnumber: "" });
  const [showError, setShowError] = useState<boolean>(false);

  const { data, isLoading, error } = useGroupData(query);

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
          description: "Group View Header",
          defaultMessage: "Group",
        })}
        TitleIcon={GroupIcon}
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
            <GroupSearchForm onSearch={(qr) => setQuery(qr)} />
          </Grid>
        </Grid>
        <Grid item xs={false} lg={false} xl={1} />
        <Grid item container alignItems="center" xs={10} lg={4} xl={4}>
          {data && data.info && !isLoading && !error && (
            <InfoBox
              data={data.animal.reduce(
                (dataObj: any, animal: Animal) => ({
                  ...dataObj,
                  [animal.animalid]: animal.name,
                }),
                {}
              )}
              hiddenKeys={data.info
                .map((animal: Animal) => animal.animalid)
                .filter((animal: any, index: number) => index > 1)}
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
              description: "Average Weight Chart title",
              defaultMessage: "Average Weight",
            })}
            chartData={[
              { id: "feed", data: data?.feed },
              /* { id: "insentec", data: data?.insentec },
            { id: "robot", data: data?.robot }, */
            ]}
            xKeys={weightXKeys}
            yKey="weight"
            yLegend={intl.formatMessage({
              description: "Average Weight in kg label",
              defaultMessage: "weight (kg)",
            })}
          />
          <ChartItem
            title={intl.formatMessage({
              description: "Average milk title",
              defaultMessage: "Average Milk",
            })}
            chartData={[{ id: "milk", data: data?.milk }]}
            xKeys={milkXKeys}
            yKey="total_milk"
            yLegend={intl.formatMessage({
              description: "Average milk in kg label",
              defaultMessage: "milk (kg)",
            })}
          />
          <ChartItem
            title={intl.formatMessage({
              description: "Feed Consumption Chart title",
              defaultMessage: "Average Feed Consumption",
            })}
            chartData={[{ id: "feed", data: data?.feed }]}
            xKeys={feedXKeys}
            yKey="daily_weight"
            yLegend={intl.formatMessage({
              description: "Consumption in kg label",
              defaultMessage: "consumption (kg)",
            })}
          />
          <ChartItem
            title={intl.formatMessage({
              description: "Average Feeding duration title",
              defaultMessage: "Average Feeding Duration",
            })}
            chartData={[{ id: "feeding duration", data: data?.duration }]}
            xKeys={durationXKeys}
            yKey="duration"
            yLegend={intl.formatMessage({
              description: "Average feeding duration in minutes label",
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

export default GroupView;
