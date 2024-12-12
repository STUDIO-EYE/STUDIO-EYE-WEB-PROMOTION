import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getClientLogoImgList = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/client`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error getClientLogoImgList]', error);
    throw error;
  }
};
