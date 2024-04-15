import React from 'react';
import PeriodPicker from './PeriodPicker';
import dayjs from 'dayjs';
import LineGraph from './LineGraph';
import styled from 'styled-components';
import { ReactComponent as Icon } from '@/assets/images/PA-Navigation/statistics.svg';
import { RequestData, ViewData } from '@/types/PromotionAdmin/statistics';

type Props = {
  title: string;
  processedData: { x: string; y: number }[];
  loading: boolean;
  data: ViewData[] | RequestData[];
  handleStartDateChange: (newStartDate: dayjs.Dayjs | null) => void;
  handleEndDateChange: (newEndDate: dayjs.Dayjs | null) => void;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  division: 'request' | 'view';
};

const Graph = ({
  title,
  processedData,
  loading,
  data,
  handleEndDateChange,
  handleStartDateChange,
  startDate,
  endDate,
  division,
}: Props) => {
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
      <BodyWrapper>
        {loading ? (
          <LoadingWrapper>〰Loading〰</LoadingWrapper>
        ) : data && data.length > 0 ? (
          <LineGraph division={division} data={processedData} />
        ) : (
          <ErrorWrapper>
            ⛔ 날짜 형식이 올바르지 않습니다. 날짜를 다시 선택해 주세요.
            <h1>* 올바르지 않은 경우는 다음과 같습니다. </h1>
            <h2>1. 기간이 두 달 이하인 경우</h2> <h2> 2. 시작일이 끝일보다 뒤에 있을 경우</h2>
          </ErrorWrapper>
        )}
      </BodyWrapper>
    </Container>
  );
};

export default Graph;

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  margin-right: 15px;
  border: 0.2px solid #878787;
  border-radius: 10px;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  margin-top: 15px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.2px solid #878787;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
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

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;