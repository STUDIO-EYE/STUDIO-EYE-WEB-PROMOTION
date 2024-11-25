import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getNews = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/news/all`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all news]', error);
    throw error;
  }
};

export const getNewsDetail = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/news/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching news detail]', error);
    throw error;
  }
};

export const postNews = async (newsData: any) => {
  try {
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/news`, newsData);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating news]', error);
    throw error;
  }
};

export const deleteNews = async (id: number) => {
  try {
    const response = await axios.delete(`${PROMOTION_BASIC_PATH}/api/news/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching news detail]', error);
    throw error;
  }
};

export const putNews = async (newsData: any) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/news`, newsData);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching news detail]', error);
    throw error;
  }
};
