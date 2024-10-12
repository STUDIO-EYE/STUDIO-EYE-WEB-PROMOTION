import React, { useState } from 'react';
import dayjs from 'dayjs';
import Graph from './Graph';
import useGraphData from '@/hooks/useGraphData';
import { fetchRequestsData } from '@/apis/PromotionAdmin/dashboard';
import { CountRequestCATEGORIES, CountRequestSTATE } from '@/constants/categories';

const RequestsGraph = () => {
  const { category, state, startDate, endDate, 
    data, processedData, 
    handleCategoryChange, handleStateChange, handleStartDateChange, handleEndDateChange, 
    division } =
    useGraphData(fetchRequestsData, dayjs().subtract(2, 'month'), dayjs().startOf('month'), 'request');

  return (
    <Graph
      title='기간별 문의 수'
      processedData={processedData}
      data={data}
      handleCategoryChange={handleCategoryChange}
      handleStateChange={handleStateChange}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      category={category}
      state={state}
      startDate={startDate}
      endDate={endDate}
      division='request'
      filter={CountRequestCATEGORIES}
      filter2={CountRequestSTATE}
    />
  );
};

export default RequestsGraph;
