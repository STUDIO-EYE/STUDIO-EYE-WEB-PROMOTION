import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const fetchViewsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number,menu:string,category:string,) => {
  try {
    const response = await axios.get(
      `${PROMOTION_BASIC_PATH}/api/views/${startYear}/${startMonth}/${endYear}/${endMonth}/${menu}/${category}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchViewsData]', error);
    throw error;
  }
};

export const fetchRequestsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number,category:string,state:string)=> {
  try {
    const response = await axios.get(
      `${PROMOTION_BASIC_PATH}/api/requests/${category}/${state}/${startYear}/${startMonth}/${endYear}/${endMonth}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchRequestsData]', error);
    throw error;
  }
};

export const fetchWaitingRequests = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/requests/waiting`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchWaitingRequests]', error);
    throw error;
  }
};

export const putViewIncrease = async (filter:any) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/views/increase`,filter);
    return response;
  } catch (error) {
    console.log('[❌Error putViewIncrease]', error);
    throw error;
  }
};
