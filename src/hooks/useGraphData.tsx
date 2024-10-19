// useGraphData 훅: 데이터를 가져오고 처리하여 그래프 컴포넌트에 전달하는 훅
import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';

// 해당 기간의 데이터를 가져오는 함수
const fetchDataByRange = async (category: string, state: string, startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, fetchFunction: Function) => {
  if (!startDate || !endDate) return [];
  const startYear = startDate.year();
  const startMonth = startDate.month() + 1;
  const endYear = endDate.year();
  const endMonth = endDate.month() + 1;
  console.log(category+" "+state)
  try {
    return await fetchFunction(startYear,startMonth,endYear,endMonth,category,state);
  } catch (error) {
    console.error(`[❌Error ${fetchFunction.name}]`, error);
    return [];
  }
};

// 데이터를 그래프에 맞게 변환하는 함수
const processChartData = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs, data: any[], division: string) => {
  if (!data) return []; // 데이터가 null인 경우 빈 배열 반환
  // api 조회수 없을 때 0 반환으로 변경 시 수정해야함

  const monthArray: { year: number; month: number }[] = [];
  let currentMonth = startDate.startOf('month');
  // 시작일부터 종료일까지의 모든 월을 배열에 추가
  while (currentMonth.isBefore(endDate.add(1, 'month'))) {
    monthArray.push({ year: currentMonth.year(), month: currentMonth.month() + 1 });
    currentMonth = currentMonth.add(1, 'month');
  }
  // 데이터가 있는 경우 해당 월의 조회수를 사용하고 없는 경우 0으로 설정하여 반환
  return monthArray.map((month) => {
    const foundData = data.find(
      (item: { year: number; month: number }) => item.year === month.year && item.month === month.month,
    );
    const count = foundData ? (division === 'statistics' ? foundData.views 
      : (Object.values(foundData.RequestCount)as number[])
        .reduce((acc: number, value: number)=>{return acc+value},0)) : 0;
      console.log(count)
    return {
      x: `${month.year}년 ${month.month}월`,
      y: count,
    };
  });
};

// 그래프 데이터를 처리하고 관리하는 훅
const useGraphData = (
  fetchFunction: Function,
  defaultStartDate: dayjs.Dayjs,
  defaultEndDate: dayjs.Dayjs,
  division: 'statistics' | 'request',
) => {
  const [category, setCategory] = useState(division==='request'?'all':'ALL'); // 카테고리 상태 추가
  const [state, setState] = useState(division==='request'?'all':'ALL'); // 카테고리 상태 추가
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(defaultEndDate);
  const [data, setData] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<{ x: string; y: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const fetchedData = await fetchDataByRange(category, state, startDate || dayjs(), endDate || dayjs(), fetchFunction);
    setData(fetchedData);
    setProcessedData(processChartData(startDate || dayjs(), endDate || dayjs(), fetchedData, division));
    setLoading(false);
  }, [category, state, startDate, endDate, fetchFunction, division]);

  useEffect(() => {
    fetchData();
  }, [category, state, startDate, endDate, division, fetchData]);

  //카테고리 변경 핸들러
  const handleCategoryChange=(category:string)=>{
    setCategory(category);
    setState(division==='request'?'all':'ALL');
  }
  //상태 변경 핸들러
  const handleStateChange=(state:string)=>{
    setState(state);
  }

  // 시작일 변경 핸들러
  const handleStartDateChange = (newStartDate: dayjs.Dayjs | null) => {
    setStartDate(newStartDate);
  };

  // 종료일 변경 핸들러
  const handleEndDateChange = (newEndDate: dayjs.Dayjs | null) => {
    setEndDate(newEndDate);
  };

  // 상태와 핸들러를 반환
  return { category, state, startDate, endDate, data, processedData, loading, 
    handleCategoryChange,handleStateChange,handleStartDateChange, handleEndDateChange, division };
};

export default useGraphData;
