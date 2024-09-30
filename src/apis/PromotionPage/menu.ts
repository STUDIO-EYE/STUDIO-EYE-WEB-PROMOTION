import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getAllMenuData = async () => {
    try {
      const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/menu`);
      return response.data;
    } catch (error) {
      console.log('[❌ Error fetching all artworks]', error);
      throw error;
    }
  };