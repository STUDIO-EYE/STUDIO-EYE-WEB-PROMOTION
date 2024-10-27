import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getFaqData = async () => {
    try {
        const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq`);
        return response.data.data;
      } catch (error) {
        console.log('[❌ Error fetching all artworks]', error);
        throw error;
      }
};