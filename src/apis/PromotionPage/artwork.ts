import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getArtworkData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/projects`);
    // await new Promise((resolve) => setTimeout(resolve, 3000)); // 일부러 임시로 3초 지연
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
