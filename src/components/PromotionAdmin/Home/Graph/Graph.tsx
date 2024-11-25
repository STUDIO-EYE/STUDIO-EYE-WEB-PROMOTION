import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import LineGraph from './LineGraph';
import styled from 'styled-components';
import { ReactComponent as Icon } from '@/assets/images/PA-Navigation/statistics.svg';
import { RequestData, ViewData } from '@/types/PromotionAdmin/statistics';
import PeriodPicker from '@/components/PromotionAdmin/Home/Graph/PeriodPicker';
import { MenuType } from '@/constants/cookiesName';

type Props = {
  title: string;
  processedData: { x: string; y: number }[];
  data: ViewData[] | RequestData[];
  handleCategoryChange: (category:string)=>void;
  handleStateChange: (state:string)=>void;
  handleStartDateChange: (newStartDate: dayjs.Dayjs | null) => void;
  handleEndDateChange: (newEndDate: dayjs.Dayjs | null) => void;
  category: string;
  state: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  division: 'request' | 'view';
  filter: Option[];
  filter2: Option[];
};

type Option={
  value:string;
  label:string;
}

const Graph = ({
  title,
  processedData,
  data,
  handleCategoryChange,
  handleStateChange,
  handleEndDateChange,
  handleStartDateChange,
  startDate,
  endDate,
  category,
  state,
  division,
  filter,
  filter2,
}: Props) => {
  const [showFilter2, setShowFilter2] = useState(false); 
  useEffect(()=>{
    if(division==='request'||category===MenuType.ARTWORK){
      setShowFilter2(true);
    }else{
      setShowFilter2(false);
    }
  },[category])

  return (
    <Container>
      <HeaderWrapper>
        <TitleWrapper>
          <Icon width={20} height={20} stroke='#595959' />
          <h1>{title}</h1>
        </TitleWrapper>
        <DayPickerWrapper>
          <PeriodPicker
            startDate={startDate}
            endDate={endDate}
            startDateChange={handleStartDateChange}
            endDateChange={handleEndDateChange}
          />
        </DayPickerWrapper>
      </HeaderWrapper>
      <div style={{
        display:'flex',justifyContent:'flex-end',marginRight:'15px'}}>
        <FilterSelect value={category} onChange={(e)=>handleCategoryChange(e.target.value)}>
          {filter&&filter.map((option)=>{
            return <FilterOption value={option.value}>{option.label}</FilterOption>
          })}
        </FilterSelect>
        <FilterSelect value={state} style={{marginLeft:'10px'}} onChange={(e)=>handleStateChange(e.target.value)} disabled={showFilter2?false:true}>
        {filter2&&filter2.map((option,index)=>{
          return <FilterOption key={index} value={option.value}>{option.label}</FilterOption>
        })}
        </FilterSelect>
      </div>
      <BodyWrapper>
        {data && data.length > 0 ? (
          <LineGraph division={division} data={processedData} />
        ) : (
          <ErrorWrapper>
            ⛔ 날짜 형식이 올바르지 않습니다. 날짜를 다시 선택해 주세요.
            <h1>* 올바르지 않은 경우는 다음과 같습니다. </h1>
            <h2>1. 기간이 2달 이하인 경우</h2> <h2> 2. 시작일이 끝일보다 뒤에 있을 경우</h2>
            <h2> 3. 기간이 12달 초과인 경우</h2>
          </ErrorWrapper>
        )}
      </BodyWrapper>
    </Container>
  );
};

export default Graph;

const Container = styled.div`
  min-width: fit-content;
  height: fit-content;
  transition: all ease-in-out 300ms;
  margin-right: 15px;
  background-color: rgba(255, 255, 255, 0.122);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  justify-content: center;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.122);
`;

const HeaderWrapper = styled.div`
  margin-top: 15px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  white-space: nowrap;
  svg {
    margin-left: 15px;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: #595959;
    margin-left: 10px;
  }
`;
const DayPickerWrapper = styled.div`
  margin-right: 15px;
`;
const BodyWrapper = styled.div`
  padding: 15px;
`;

const ErrorWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
  h1 {
    font-family: 'pretendard-light';
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 13px;
  }

  h2 {
    font-family: 'pretendard-light';
    margin-bottom: 5px;
    font-size: 13px;
  }
`;

const FilterSelect=styled.select`
  min-width: fit-content;
  height: fit-content;
  backdrop-filter: blur(4px);
  border-radius: 5px;
  border: 1px solid;
  padding: 4px;
  font-size: 0.9rem;
  font-family: 'pretendard';
`
const FilterOption=styled.option`
font-size: 0.9rem;
font-family: pretendard;
`

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;
