import { FC } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { Theme } from "@nivo/core";

type ScatterChartDataPoint = {
  x: string | number | Date;
  y: string | number | Date;
  [key: string]: any;
};

type ScatterChartSeries = {
  id: string | number;
  data: Array<ScatterChartDataPoint>;
};

type ScatterChartProps = {
  data: Array<ScatterChartSeries>;
  xScaleType: "time" | "linear";
  yLegend?: string;
  xLegend?: string;
};

const theme: Theme = {
  axis: {
    legend: {
      text: {
        fill: "#707070",
        fontSize: "0.95em",
        fontWeight: 600,
      },
    },
  },
};

const ScatterChart: FC<ScatterChartProps> = (props: ScatterChartProps) => {
  const showLegend: boolean = props.data && props.data.length > 1;
  console.log(props.data);
  return (
    <ResponsiveScatterPlot
      data={props.data}
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      xScale={{
        type: props.xScaleType,
        format: props.xScaleType === "time" ? "%Y-%m-%d" : undefined,
        useUTC: true,
        precision: "day",
      }}
      yScale={{ type: "linear", stacked: false, min: "auto", max: "auto" }}
      xFormat={props.xScaleType === "time" ? "time:%Y-%m-%d" : undefined}
      yFormat=" >-.2f"
      axisTop={null}
      theme={theme}
      axisBottom={{
        format: props.xScaleType === "time" ? "%b %d" : undefined,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.xLegend,
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: 7,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: ".3s",
        legend: props.yLegend,
        legendOffset: -50,
        legendPosition: "middle",
      }}
      colors={{ scheme: "category10" }}
      useMesh={true}
      isInteractive={true}
      enableGridY
      enableGridX
      legends={
        showLegend
          ? [
              {
                anchor: "top-left",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -40,
                itemsSpacing: 2,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 12,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default ScatterChart;
