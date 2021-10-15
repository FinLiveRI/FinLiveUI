import axios from 'axios';
import { getStoredToken } from '../utils/helpers';
import useMock from '../mock/group/api';

const url = '/group'

export type GroupDataQuery = {
  calvingnumber: string,
  farmid?: string,
  startDate?: string,
  endDate?: string
}

const getGroup = (query: GroupDataQuery) => {
  const token: string | null = getStoredToken();
  const headers: any = {
    'Authorization': `Bearer ${token}`
  }
  return axios.get(
    `${process.env.API}${url}/${query.calvingnumber}`, 
    { headers }
  );
};

export const getGroupData = process.env.API 
  ? getGroup
  : async(query: GroupDataQuery) => useMock(query)
;