import React from 'react';
import dayjs from 'dayjs';
import Graph from './Graph';
import { fetchViewsData } from '@/apis/PromotionAdmin/dashboard';
import useGraphData from '@/hooks/useGraphData';
import { CountViewArtworkCategory, CountViewMenu } from '@/constants/categories';

const StatisticsGraph = () => {
  const { category, state, startDate, endDate, data, processedData, handleCategoryChange, handleStateChange, handleStartDateChange, handleEndDateChange, division } =
    useGraphData(fetchViewsData, dayjs().subtract(5, 'month'), dayjs().startOf('month'), 'statistics');

  return (
    <Graph
      title='기간별 조회 수'
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
      division='view'
      filter={CountViewMenu}
      filter2={CountViewArtworkCategory}
    />
  );
};

export default StatisticsGraph;
