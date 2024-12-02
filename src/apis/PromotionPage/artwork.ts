import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios, { AxiosError } from 'axios';

export const getArtworkData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/projects`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};
export const getArtworkMainData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/projects/main`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getArtworkDetailData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/projects/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching artwork detail]', error);
    throw error;
  }
};
