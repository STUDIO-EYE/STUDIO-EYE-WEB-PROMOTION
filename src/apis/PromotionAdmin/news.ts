import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { INEWS } from '@/types/PromotionAdmin/news';
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

export const getNewsPaginate = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq/page?page=${page}&size=${perPage}`);
    return response.data;
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

export const postNews = async (newsData:FormData)=>{
    try{
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },};
        const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/news`, newsData, config);
        return response.data;
    }catch (error) {
        console.error('[❌ Error creating artwork]', error);
        throw error;
      }
}
