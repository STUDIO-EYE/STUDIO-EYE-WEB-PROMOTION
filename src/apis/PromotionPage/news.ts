import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getAllNewsData = async () => {
  try {
    const response = await axios.get(`http://www.studioeye-promotion.kro.kr:8080/api/news/all`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getNewsData = async (id: number) => {
  try {
    const response = await axios.get(`http://www.studioeye-promotion.kro.kr:8080/api/news/${id}`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};
