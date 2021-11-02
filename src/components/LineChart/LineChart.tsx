import { FC } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { Theme } from '@nivo/core';


type LineChartDataPoint = {
  x: string | number | Date,
  y: string | number | null,
  [key: string]: any
}

type LineChartSeries = {
  id: string,
  data: Array<LineChartDataPoint>
}

type LineChartProps = {
  data: Array<LineChartSeries>,
  xScaleType: "time" | "week",
  yLegend?: string,
  xLegend?: string
}

const theme: Theme = {
  axis: {
    legend: {
      text: {
        fill: "#707070",
        fontSize: "0.95em",
        fontWeight: 600
      }
    }
  },
};


const LineChart: FC<LineChartProps> = (props: LineChartProps) => {
  const showLegend: boolean = props.data && props.data.length > 1;

  const xScale: any = {
    type: 'time',
    format: '%Y-%m-%d',
    useUTC: true,
    precision: 'day',
  }
 
  return (
    <ResponsiveLine
      data={props.data}
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      xScale={xScale}
      animate={false}
      yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto'}}
      xFormat={props.xScaleType === "time" ? "time:%Y-%m-%d" : "time:%W-%Y"}
      yFormat=" >-.2f"
      curve="linear"
      axisTop={null}
      axisBottom={{
        format: props.xScaleType === "time" ? '%b %d' : '%W-%Y',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.xLegend,
        legendOffset: 36,
        legendPosition: 'middle',
        tickValues: 7
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: '.3s',
        legend: props.yLegend,
        legendOffset: -50,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'category10' }}
      theme={theme}
      lineWidth={2}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableGridY
      enableGridX
      legends={showLegend ? [
        {
          anchor: 'top-left',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -40,
          itemsSpacing: 2,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 12,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ] : undefined}
    />
  );
}

export default LineChart;