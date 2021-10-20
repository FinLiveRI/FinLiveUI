import { FC, useState } from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LineChart, ScatterChart } from '../';
import KeySelection from "./KeySelection";
import { xKeyObj } from "../../utils/types";

type ChartDataItem = {
  id: string,
  data: Array<any>
}

type ChartItemProps = {
  chartData: Array<ChartDataItem>,
  title: string,
  xKeys: Array<xKeyObj>,
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
  const mapTimeSeriesData = (obj: any, key: string) => ({x: new Date(obj[key]), y: obj[props.yKey]});
  const mapLinearSeriesData = (obj: any, key: string) => ({x: obj[key], y: obj[props.yKey]});

  const hasKeySelect: boolean = props.xKeys.length > 1;

  const [xKey, setXKey] = useState<xKeyObj>(props.xKeys[0]);

  const classes = useStyles();


  return (
    <Grid item xs={12} lg={6} xl={4} className={classes.chartContainer}>
      <Typography variant="h5" align="center">{props.title}</Typography>
      <Card style={{width: '100%', height: '100%'}}>  
        {
          hasKeySelect && xKey
          ? (
            <Grid container style={{height: "10%", paddingLeft: "2em", paddingRight: "2em", paddingTop: "0.2em"}} direction="row" justifyContent="flex-end">
              <KeySelection 
                value={xKey.key}
                onChange={(value: string)=>setXKey(props.xKeys.find(obj => obj.key === value) || props.xKeys[0])}
                keys={props.xKeys.map(obj => obj.key)} 
              />
            </Grid>
          ): null
        }
        <div style={{height: hasKeySelect ? "90%" : "100%", width: "100%"}}>
          { xKey.plot === "line" ? (
            <LineChart 
              data={props.chartData.map((obj: ChartDataItem) => ({id: obj.id, data: obj.data.map((dataobj: any) => mapTimeSeriesData(dataobj, xKey.key))}))} 
              yLegend={props.yLegend}
              xLegend={xKey.legend}
              xScaleType={xKey.type}
            />
          ) : (
            <ScatterChart
              data={props.chartData.map((obj: ChartDataItem) => ({id: obj.id, data: obj.data.map((dataobj: any) => mapLinearSeriesData(dataobj, xKey.key))}))} 
              yLegend={props.yLegend}
              xLegend={xKey.legend}
              xScaleType={xKey.type}
            />
          )}
        </div>
       
      </Card>
    </Grid>
  );
}

export default ChartItem;