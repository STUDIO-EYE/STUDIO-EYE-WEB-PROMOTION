import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import { IRecruitmentList } from '@/types/PromotionAdmin/recruitment';
import axios from 'axios';

export const postRecruitment = async (recruitmentData: {
  title: string;
  startDate: string;
  deadline: string;
  link: string;
}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/recruitment`, recruitmentData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating recruitment]', error);
    throw error;
  }
};

export const getAllRecruitmentData = async (page: number, size: number): Promise<IRecruitmentList> => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/recruitment?page=${page - 1}&size=${size}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching RecruitmentData]', error);
    throw error;
  }
};

export const getRecruitmentData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/recruitment/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(`[❌ Error fetching RecruitmentData for id: ${id}]`, error);
    throw error;
  }
};

export const updateRecruitmentData = async (recruitmentData: {
  id: number;
  title: string;
  link: string;
  startDate: string;
  deadline: string;
}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/recruitment`, recruitmentData, config);
    return response.data;
  } catch (error) {
    console.log('[❌ Error updating RecruitmentData]', error);
    throw error;
  }
};

export const deleteRecruitmentData = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PROMOTION_BASIC_PATH}/api/recruitment/${id}`);
  } catch (error) {
    console.log('[❌Error delete RecruitmentData]', error);
    throw error;
  }
};

export const postBenefit = async (benefitData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/benefit`, benefitData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating benefit]', error);
    throw error;
  }
};

export const getBenefitData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/benefit`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching BenefitData]', error);
    throw error;
  }
};

export const updateBenefit = async (benefitData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/benefit`, benefitData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating benefit]', error);
    throw error;
  }
};

export const updateBenefitText = async (benefitData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/benefit/modify`, benefitData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating benefit]', error);
    throw error;
  }
};

export const deleteBenefitData = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PROMOTION_BASIC_PATH}/api/benefit/${id}`);
  } catch (error) {
    console.log('[❌Error delete BenefitData]', error);
    throw error;
  }
};
