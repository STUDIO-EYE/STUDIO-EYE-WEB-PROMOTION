import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const postCompanyInformation = async (formData: FormData) => {
  try {
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/company/information`, formData);
    return response.data.data;
  } catch (error) {
    console.error('[❌ Error posting company information]', error);
    throw error;
  }
};

export const getCompanyData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/information`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getCompanyLogoData = async (isLight: boolean) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/logo/${isLight}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error getCompanyLogo]', error);
    throw error;
  }
};

export const getCompanyIntroData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/introduction`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getCompanyDetailData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/detail`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getCompanyBasicData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/company/basic`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getCEOData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/ceo`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getPartnersData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/partners`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const putCompanySloganData = async (formData: FormData) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/company/slogan`, formData);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error updating company slogan data]', error);
    throw error;
  }
};

export const putCompanyLogosData = async (formData: FormData) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/company/logo`, formData);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error updating company logos data]', error);
    throw error;
  }
};

export const putCompanyLogosSloganData = async (formData: FormData) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/company/logo&slogan`, formData);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error updating company logos and slogan data]', error);
    throw error;
  }
};

export const putPartnersLogoData = async (formData: FormData) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/partners`, formData);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error updating partners logo data]', error);
    throw error;
  }
};

export const putPartnersInfoData = async (formData: FormData) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/partners/modify`, formData);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error updating partners data]', error);
    throw error;
  }
};

export const getPartnersLogoData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/partners/logoImgList`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const deletePartner = async (id: number) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/partners/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error deleting partners data]', error);
    throw error;
  }
};

export const getPartnersDetailData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/partners/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching artwork detail]', error);
    throw error;
  }
};

export const getPartnerPaginateData = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/partners/page?page=${page}&size=${perPage}`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getClientData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/client`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getClientDetailData = async (id: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/client/${id}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching artwork detail]', error);
    throw error;
  }
};

export const getClientLogoData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/client/logoImgList`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const getClientPaginateData = async (page: number, perPage: number) => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/client/page?page=${page}&size=${perPage}`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};
