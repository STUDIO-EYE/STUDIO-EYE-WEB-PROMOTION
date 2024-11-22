import axios from 'axios';
import { Request } from '@/types/request';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

export const fetchRequests = async ({ requestId }: { requestId: number }): Promise<Request> => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/requests/${requestId}`);
    return response.data.data;
  } catch (error) {
    console.log('[❌Error fetching requests]', error);
    throw error;
  }
};

export const getRequestsData = async () => {
  try {
    const response = await axios.get(`${PROMOTION_BASIC_PATH}/api/requests`);
    return response.data.data;
  } catch (error) {
    console.log('[❌ Error fetching all artworks]', error);
    throw error;
  }
};

export const updateRequestReply = async (id: number, replyData: { answer: string; state: string }) => {
  try {
    const response = await axios.put(`${PROMOTION_BASIC_PATH}/api/requests/${id}/comment`, replyData);
    return response.data;
  } catch (error) {
    console.log('[❌ Error updating RecruitmentData]', error);
    throw error;
  }
};

export const deleteRequest = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PROMOTION_BASIC_PATH}/api/requests/${id}`);
    console.log(`[✅ Success] Request with ID ${id} has been deleted.`);
  } catch (error) {
    console.log('[❌ Error deleting request]', error);
    throw error;
  }
};

