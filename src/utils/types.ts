export type xKeyObj = {
  key: string;
  type: "time" | "linear";
  plot: "line" | "scatter";
  legend: string;
};

export type Animal = {
  id: number;
  name: string;
  euid: string;
  breed: string;
  gender: string;
  birthdate: string;
  animalid: number;
  rfid: string;
  arrivaldate: string;
  departuredate: string;
  departurereason: string;
  organization: string;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  usertype: string;
  username: string;
};

export type Organization = {
  organization_id: number;
  name: string;
  default: boolean;
};

export type UserAccountInfo = {
  user: User;
  organizations: Array<Organization>;
};

export type Farm = {
  farmid: number;
  name: string;
  description: string;
  created: string;
  organization: number;
};

export type Feed = {
  day: string;
  daily_weight: number;
  lactation: number;
};

export type FeedDuration = {
  visit_day: string;
  duration: number;
  lactation: number;
};

export type Weight = {
  euid: string;
  timestamp: string;
  weight: number;
  automaticmeasurement: boolean;
  equipment_id: string;
  organization: number;
  lactation: number;
};

export type Milk = {
  day: string;
  total_milk: number;
  lacation: number;
};

export type AnimalChart = {
  animal: Animal;
  duration: Array<FeedDuration>;
  weight: Array<Weight>;
  feed: Array<Feed>;
  milk: Array<Milk>;
};

export type GroupChart = {
  animal: Array<Animal>;
  duration: Array<FeedDuration>;
  weight: Array<Weight>;
  feed: Array<Feed>;
  milk: Array<Milk>;
};
