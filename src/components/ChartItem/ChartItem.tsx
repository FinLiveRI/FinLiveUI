import { FC, useState, useMemo } from "react";
import { Grid, Typography, Card } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { LineChart, ScatterChart } from '../';
import KeySelection from "./KeySelection";
import {DateButtonGroup, DateButtonOption} from './DateButtonGroup';
import { xKeyObj } from "../../utils/types";
import moment from "moment";

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

type XScaleOption = "time" | "week";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "100%", 
      height: "100%"
    },
    chartContainer: {
      height: "45vh", 
      marginBottom: "3em"
    },
    toolbarContainer: {
      height: "10%", 
      paddingLeft: "2em", 
      paddingRight: "2em", 
      paddingTop: "0.2em"
    }
  }),
);

const getArrayAverage = (nums: Array<number>): number => nums.reduce((a: number, b: number) => (a + b)) / nums.length;

const averageByWeek = (data: Array<any>, valueKey: string) => {
  const weekDayObj = data.reduce((acc, obj) => {

  const weekKey: string = `${moment(obj.timestamp).year()}-${moment(obj.timestamp).week()}`;
  
  if (!acc[weekKey]) {
    acc[weekKey] = {date : obj.timestamp, values: []};
  }
  
  acc[weekKey].values.push(obj[valueKey]);

  return acc;
}, {});
  return Object.keys(weekDayObj).map(key => ({x: new Date(weekDayObj[key].date), y: getArrayAverage(weekDayObj[key].values)}))
}

const ChartItem: FC<ChartItemProps> = (props: ChartItemProps) => {

  const hasKeySelect: boolean = props.xKeys.length > 1;

  const [xKey, setXKey] = useState<xKeyObj>(props.xKeys[0]);
  const [dateOption, setDateOption] = useState<DateButtonOption>("day");

  const chartData: any = useMemo(() => {
    const mapTimeSeriesData = (obj: any, key: string) => ({x: new Date(obj[xKey.key]), y: obj[props.yKey]});
    const mapScatterPlotData = (obj: any, key: string) => ({x: obj[key], y: obj[props.yKey]});

    if(dateOption === "day" && xKey.plot === "line") {
      return props.chartData.map((obj: ChartDataItem) => ({
        id: obj.id, 
        data: obj.data.map((dataobj: any) => mapTimeSeriesData(dataobj, props.yKey)
      )}));
    }
    else if(dateOption === "week" && xKey.plot === "line") {
      return props.chartData.map((obj: ChartDataItem) => ({
        id: obj.id, 
        data: averageByWeek(obj.data, props.yKey)
      }));
    }
    else {
      return props.chartData.map((obj: ChartDataItem) => ({
        id: obj.id, 
        data: obj.data.map((dataobj: any) => mapScatterPlotData(dataobj, xKey.key)
      )}));
    }
  }, [dateOption, xKey.plot, xKey.key, props.chartData, props.yKey]);


  const xLegend: string = xKey.plot === "line" ? dateOption : xKey.legend;
  const xScaleType: XScaleOption = xKey.plot === "line" && dateOption === "week" ? "week" : "time";

  const classes = useStyles();

  return (
    <Grid item xs={12} lg={6} xl={4} className={classes.chartContainer}>
      <Typography variant="h5" align="center">{props.title}</Typography>
      <Card className={classes.card}>  
        {
          hasKeySelect && xKey
          ? (
            <Grid 
              container 
              className={classes.toolbarContainer} 
              direction="row" 
              justifyContent={xKey.plot === "line" ? "space-evenly" : "flex-end"} 
              alignItems="center"
            >
              {xKey.plot === "line" && <DateButtonGroup value={dateOption} onChange={(value: DateButtonOption) => setDateOption(value)} />}
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
              data={chartData}
              yLegend={props.yLegend}
              xLegend={xLegend}
              xScaleType={xScaleType}
            />
          ) : (
            <ScatterChart
              data={chartData} 
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