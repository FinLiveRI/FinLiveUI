export type ApiHookResponse = {
  data: any;
  isLoading: boolean;
  error: any;
};

export type Farm = {
  farmid: number;
  name: string;
};

export type Animal = {
  animalid: number;
  euid : string;
  name: string;
  farmid: string;
};