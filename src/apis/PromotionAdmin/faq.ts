import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export interface IFAQ {
  id: number;
  question: string;
  answer: string;
  visibility: boolean;
}

export interface IGetFAQData {
  data: IFAQ[];
}

export interface IGetFAQDetailData {
  data: IFAQ;
}

export const postFAQ = async (FAQData: { question: string; answer: string; visibility: boolean }) => {
  try {
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/faq`, FAQData);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating FAQ]', error);
    throw error;
  }
};

export const getFAQData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all FAQ]', error);
    throw error;
  }
};

export const getFAQDetailData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/faq/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching FAQ]', error);
    throw error;
  }
};

export const updateFAQData = async (FAQData: { id: number; question: string; answer: string; visibility: boolean }) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/faq`, FAQData);
    return response.data;
  } catch (error) {
    console.log('[❌ Error updating FAQ]', error);
    throw error;
  }
};

export const deleteFAQData = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PROMOTION_BASIC_PATH}/api/faq/${id}`);
  } catch (error) {
    console.log('[❌Error delete FAQ]', error);
    throw error;
  }
};
