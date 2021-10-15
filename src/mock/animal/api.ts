/* eslint-disable react-hooks/rules-of-hooks */
import table from './data.json';
import moment from 'moment';
import delay from '../delay';

const mockGetAnimal= async(query: any) => {
  const data: any = [...table];
  const animal: any = data.find((obj: any) => obj.id === parseInt(query.id));

  await delay();

  if(!animal) {
    throw new Error("Animal does not exist.");
  }

  const animal_data: any = {...animal};
  if(query.startDate) {
    animal_data.feed = animal_data?.feed.filter((obj: any) => moment(obj.timestamp.substring(0, 10)).isSameOrAfter(moment(query.startDate)));
    animal_data.weight = animal_data?.weight.filter((obj: any) => moment(obj.timestamp.substring(0, 10)).isSameOrAfter(moment(query.startDate)));
    animal_data.milk = animal_data?.milk.filter((obj: any) => moment(obj.timestamp.substring(0, 10)).isSameOrAfter(moment(query.startDate)));
  }
  if(query.endDate) {
    animal_data.feed = animal_data?.feed.filter((obj: any) => moment(obj.timestamp.substring(0,10)).isSameOrBefore(moment(query.endDate)));
    animal_data.weight= animal_data?.weight.filter((obj: any) => moment(obj.timestamp.substring(0,10)).isSameOrBefore(moment(query.endDate)));
    animal_data.milk= animal_data?.milk.filter((obj: any) => moment(obj.timestamp.substring(0,10)).isSameOrBefore(moment(query.endDate)));
  }

  const insentec = animal_data.feed.map((obj: any) => ({timestamp: obj.timestamp, value: obj.value - Math.floor(Math.random() * 30)}));
  const robot = animal_data.feed.map((obj: any) => ({timestamp: obj.timestamp, value: obj.value - Math.floor(Math.random() * 10)}));
  animal_data.insentec = insentec;
  animal_data.robot = robot;
  
  return { data: animal_data };
}

export default mockGetAnimal;