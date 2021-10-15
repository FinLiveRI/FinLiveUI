import axios from 'axios';
import { getStoredToken } from '../utils/helpers';
import useMock from '../mock/animal/api';

const url = '/animal'

export type AnimalDataQuery = {
  id: string,
  farmid?: string,
  startDate?: string,
  endDate?: string
}

const getAnimal = (query: AnimalDataQuery) => {
  const token: string | null = getStoredToken();

  const headers: any = {
    'Authorization': `Bearer ${token}`
  }
  return axios.get(
    `${process.env.API}${url}/${query.id}`, 
    { headers }
  );
};

export const getAnimalData = process.env.API 
  ? getAnimal
  : async(query: AnimalDataQuery) => useMock(query)
;