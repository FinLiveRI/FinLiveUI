export type FarmItem = {
  id: string,
  name: string
}

export type xKeyObj = {
  key: string,
  type: "time" | "linear",
  plot: "line" | "scatter",
  legend: string
}