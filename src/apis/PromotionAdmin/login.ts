import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { loginType } from '@/types/PromotionAdmin/login';
import axios from 'axios';

export const login = async (formData: { email: string; pwd: string }): Promise<loginType> => {
  try {
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/user-service/login`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log('[❌Error login api]', error);
    throw error;
  }
};
