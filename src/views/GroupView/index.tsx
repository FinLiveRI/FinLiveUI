import { useState, useEffect, FC} from 'react';
import { useIntl } from 'react-intl';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { 
  ContentContainer,
  InfoBox,
  ViewHeader,
  ErrorSnack,
  ChartItem,
  Spinner
} from '../../components';
import { useGroupData } from '../../hooks';
import { ReactComponent as GroupIcon } from '../../assets/icons/group.svg';
import GroupSearchForm from './GroupSearchForm';

const useStyles = makeStyles(() =>
  createStyles({
    headerPanel: {
      maxWidth: "100%"
    },
    chartListContainer: {
      width: "99vw", 
      paddingLeft: "0.2vw", 
      paddingRight:"0.2vw"
    },
    spinnerContainer: {
      minWidth: "30vw", 
      minHeight: "30vh", 
      marginTop: "20vh", 
    }
  })
);

const GroupView: FC = () => {
  const classes = useStyles();
  const intl = useIntl();
  const [query, setQuery] = useState<any>({});
  const [showError, setShowError] = useState<boolean>(false);
  
  const {data, isLoading, error} = useGroupData(query);

  useEffect(() => {
    if(error) setShowError(true);
  }, [error]);

  return (
    <ContentContainer>
      <ViewHeader 
        title={intl.formatMessage({
          description: "Group View Header", 
          defaultMessage: "Group"
        })}
        TitleIcon={GroupIcon}
      />
      <Grid 
        item container 
        direction="row" 
        justifyContent="space-evenly" 
        spacing={2} 
        className={classes.headerPanel}
      >
        <Grid 
          item container 
          direction="column" 
          xs={10} lg={7} xl={6} 
          spacing={0} 
          justifyContent="center" 
          alignItems="center"
        >
          <Grid item>
            <GroupSearchForm 
              onSearch={(qr)=>setQuery(qr)}
            />
          </Grid>
        </Grid>
        <Grid item xs={false} lg={false} xl={1} />         
        <Grid item container alignItems="center" xs={10} lg={4} xl={4}>
          { data && data.info && !isLoading && !error && (
            <InfoBox 
              data={data.info.reduce((dataObj: any, animal: any) =>  ({...dataObj, [animal.animalid]: animal.name}), {})}
              hiddenKeys={data.info.map((animal: any) => animal.animalid).filter((animal: any, index: number) => index > 1)}
            />
          )}
        </Grid>
      </Grid>
      { data && !isLoading && !error && (
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
              defaultMessage: "Weight"
            })}
            chartData={[{id: "weight", data: data?.weight}]} 
            xKey="timestamp" 
            yKey="weight" 
            yLegend={intl.formatMessage({
              description: "Weight in kg label", 
              defaultMessage: "weight (kg)"
            })}
          />
          <ChartItem 
            title={intl.formatMessage({
              description: "Total milk title", 
              defaultMessage: "Total Milk"
            })}
            chartData={[{id: "milk", data: data?.milk}]} 
            xKey="timestamp" 
            yKey="totalweight" 
            yLegend={intl.formatMessage({
              description: "Total milk in kg label", 
              defaultMessage: "total milk (kg)"
            })}
          />
          <ChartItem 
            title={intl.formatMessage({
              description: "Feed Consumption Chart title", 
              defaultMessage: "Feed Consumption"
            })}
            chartData={[{id: "insentec", data: data?.insentec}, {id: "robot", data: data?.robot}]} 
            xKey="timestamp" 
            yKey="value" 
            yLegend={intl.formatMessage({
              description: "Consumption in kg label", 
              defaultMessage: "consumption (kg)"
            })}
          />
          <ChartItem 
            title={intl.formatMessage({
                description: "Feeding duration title", 
                defaultMessage: "Feeding Duration"
            })}
            chartData={[{id: "milk", data: data?.milk}]} 
            xKey="timestamp" 
            yKey="totalweight" 
            yLegend={intl.formatMessage({
              description: "Total feeding duration in minutes label", 
              defaultMessage: "duration (min)"
            })}
          />
        </Grid>
      )}
      { isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner />
       </div>
      )}
      {
        !isLoading && error && (
          <ErrorSnack open={showError} handleClose={()=>setShowError(false)} error={error} />
        )
      }
    </ContentContainer>
  );
}

export default GroupView;