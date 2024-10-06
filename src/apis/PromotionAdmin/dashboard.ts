import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const fetchViewsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(
      `${PROMOTION_BASIC_PATH}/api/views/${startYear}/${startMonth}/${endYear}/${endMonth}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchViewsData]', error);
    throw error;
  }
};

export const fetchRequestsData = async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(
      `${PROMOTION_BASIC_PATH}/api/requests/${startYear}/${startMonth}/${endYear}/${endMonth}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchRequestsData]', error);
    throw error;
  }
};
export const fetchCategoryRequestData= async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(
      `${PROMOTION_BASIC_PATH}/api/requests/category/${startYear}/${startMonth}/${endYear}/${endMonth}`,
    );
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetchRequestsData]', error);
    throw error;
  }
};
export const fetchStateRequestData= async (startYear: number, startMonth: number, endYear: number, endMonth: number) => {
  try {
    const response = await axios.get(
      `${PROMOTION_BASIC_PATH}/api/requests/state/${startYear}/${startMonth}/${endYear}/${endMonth}`,
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

export const putViewIncrease = async () => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/views/increase`);
    return response;
  } catch (error) {
    console.log('[❌Error putViewIncrease]', error);
    throw error;
  }
};
