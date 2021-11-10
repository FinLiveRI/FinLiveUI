/* eslint-disable react-hooks/rules-of-hooks */
import table from "./data.json";
import moment from "moment";
import delay from "../delay";

const mockGetGroup = async (query: any) => {
  const data: any = [...table];

  await delay();

  if (query.calvingnumber < 10) {
    throw new Error("Group does not exist.");
  }

  const group_data: any = { feed: [], milk: [], weight: [], info: [] };

  data.forEach((animal_data: any) => {
    group_data.info.push(animal_data.info);

    if (query.startDate) {
      animal_data.feed = animal_data?.feed.filter((obj: any) =>
        moment(obj.timestamp.substring(0, 10)).isSameOrAfter(
          moment(query.startDate)
        )
      );
      animal_data.weight = animal_data?.weight.filter((obj: any) =>
        moment(obj.timestamp.substring(0, 10)).isSameOrAfter(
          moment(query.startDate)
        )
      );
      animal_data.milk = animal_data?.milk.filter((obj: any) =>
        moment(obj.timestamp.substring(0, 10)).isSameOrAfter(
          moment(query.startDate)
        )
      );
    }
    if (query.endDate) {
      animal_data.feed = animal_data?.feed.filter((obj: any) =>
        moment(obj.timestamp.substring(0, 10)).isSameOrBefore(
          moment(query.endDate)
        )
      );
      animal_data.weight = animal_data?.weight.filter((obj: any) =>
        moment(obj.timestamp.substring(0, 10)).isSameOrBefore(
          moment(query.endDate)
        )
      );
      animal_data.milk = animal_data?.milk.filter((obj: any) =>
        moment(obj.timestamp.substring(0, 10)).isSameOrBefore(
          moment(query.endDate)
        )
      );
    }

    group_data.feed = animal_data.feed.map((obj: any, index: number) =>
      group_data.feed[index]?.value
        ? {
            timestamp: obj.timestamp,
            value: group_data.feed[index].value + Number(obj.value),
            lactation_period: moment(obj.timestamp).format("D"),
          }
        : { ...obj, lactation_period: moment(obj.timestamp).format("D") }
    );
    group_data.weight = animal_data.weight.map((obj: any, index: number) =>
      group_data.weight[index]?.weight
        ? {
            timestamp: obj.timestamp,
            weight: group_data.weight[index].weight + Number(obj.weight),
            lactation_period: moment(obj.timestamp).format("D"),
          }
        : { ...obj, lactation_period: moment(obj.timestamp).format("D") }
    );

    group_data.milk = animal_data.milk.map((obj: any, index: number) =>
      group_data.milk[index]?.totalmilk
        ? {
            timestamp: obj.timestamp,
            totalmilk: group_data.milk[index].totalmilk + Number(obj.totalmilk),
            lactation_period: moment(obj.timestamp).format("D"),
          }
        : { ...obj, lactation_period: moment(obj.timestamp).format("D") }
    );
  });

  const insentec = group_data.feed.map((obj: any) => ({
    ...obj,
    timestamp: obj.timestamp,
    value: obj.value - Math.floor(Math.random() * 30),
  }));
  const robot = group_data.feed.map((obj: any) => ({
    ...obj,
    timestamp: obj.timestamp,
    value: obj.value - Math.floor(Math.random() * 10),
  }));
  group_data.insentec = insentec;
  group_data.robot = robot;

  return { data: group_data };
};

export default mockGetGroup;
