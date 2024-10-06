import React, { useState } from 'react';
import dayjs from 'dayjs';
import Graph from './Graph';
import useGraphData from '@/hooks/useGraphData';
import { fetchCategoryRequestData, fetchRequestsData } from '@/apis/PromotionAdmin/dashboard';
import { CountRequestCATEGORIES } from '@/constants/categories';

const RequestsGraph = () => {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 카테고리 상태 추가
  const [selectedState, setSelectedState] = useState('all'); // 카테고리 상태 추가
  const fetchDataFunction = selectedCategory === 'all' ?
    (selectedState==='all'?fetchRequestsData:fetch) : fetchCategoryRequestData;
  const { startDate, endDate, data, processedData, handleStartDateChange, handleEndDateChange, division } =
    useGraphData(fetchDataFunction, dayjs().subtract(2, 'month'), dayjs().startOf('month'), 'request');

  return (
    <Graph
      title='기간별 문의 수'
      processedData={processedData}
      data={data}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      startDate={startDate}
      endDate={endDate}
      division='request'
      filter={CountRequestCATEGORIES}
    />
  );
};

export default RequestsGraph;
