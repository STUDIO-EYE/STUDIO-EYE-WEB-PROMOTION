import React from 'react';
import dayjs from 'dayjs';
import Graph from './Graph';
import { fetchViewsData } from '@/apis/PromotionAdmin/dashboard';
import useGraphData from '@/hooks/useGraphData';

const filter=['immedi','ate']

const StatisticsGraph = () => {
  const { startDate, endDate, data, processedData, handleStartDateChange, handleEndDateChange, division } =
    useGraphData(fetchViewsData, dayjs().subtract(5, 'month'), dayjs().startOf('month'), 'statistics');

  return (
    <Graph
      title='기간별 조회 수'
      processedData={processedData}
      data={data}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      startDate={startDate}
      endDate={endDate}
      division='view'
      filter={filter}
    />
  );
};

export default StatisticsGraph;
