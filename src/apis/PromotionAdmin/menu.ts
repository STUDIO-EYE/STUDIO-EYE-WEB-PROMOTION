import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import axios from 'axios';

export const getAllMenuData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/menu/all`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const deleteMenuData = async (menuId: number) => {
  try {
    const response = await axios.delete(`${PROMOTION_BASIC_PATH}/api/menu/${menuId}`);
    return response.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const postMenuData = async (menuData: { title: string; visibility: boolean }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(`${PROMOTION_BASIC_PATH}/api/menu`, menuData, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error creating menu]', error);
    throw error;
  }
};

export const putMenuData = async (menuId: number, menuTitle: string, visibility: boolean) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestBody = {
      id: menuId,
      title: menuTitle,
      visibility: visibility,
    };

    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/menu`, requestBody, config);
    return response.data;
  } catch (error) {
    console.error('[❌ Error updating menu]', error);
    throw error;
  }
};
