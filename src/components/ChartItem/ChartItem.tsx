import { FC } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LineChart } from '../';

type ChartDataItem = {
  id: string,
  data: Array<any>
}

type ChartItemProps = {
  chartData: Array<ChartDataItem>,
  title: string,
  xKey: string,
  yKey: string,
  yLegend: string
}

const useStyles = makeStyles(() =>
  createStyles({
    chartContainer: {
      height: "45vh", 
      marginBottom: "3em"
    }
  }),
);

const ChartItem: FC<ChartItemProps> = (props: ChartItemProps) => {
  const mapSeriesData = (obj: any) => ({x: new Date(obj[props.xKey]), y: obj[props.yKey]});

  const classes = useStyles();

  return (
    <Grid item xs={12} lg={6} xl={4} className={classes.chartContainer}>
      <Typography variant="h5" align="center">{props.title}</Typography>
      <LineChart 
        data={props.chartData.map((obj: ChartDataItem) => ({id: obj.id, data: obj.data.map(mapSeriesData)}))} 
        yLegend={props.yLegend}
      />
    </Grid>
  );
}

export default ChartItem;