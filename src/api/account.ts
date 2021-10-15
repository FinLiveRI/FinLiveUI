import axios from 'axios';
import { getStoredToken } from '../utils/helpers';

const url = '/management/account'

export const getUserData = () => {
  const token: string | null = getStoredToken();

  if(!token) return Promise.resolve(null);
  
  return axios.get(
    `${process.env.REACT_APP_API}${url}`, 
    {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
  );
};