import RequestsGraph from '@/components/PromotionAdmin/Home/Graph/RequestsGraph';
import StatisticsGraph from '@/components/PromotionAdmin/Home/Graph/StatisticsGraph';
import RequestSummary from '@/components/PromotionAdmin/Home/RequestSummary/RequestSummary';
import React from 'react';
import styled from 'styled-components';

const index = () => {
  return (
    <Container>
      <HeaderWrapper>Overview</HeaderWrapper>
      <RequestSummary />
      <StatisticsWrapper>
        <StatisticsGraph />
        <RequestsGraph />
      </StatisticsWrapper>
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 32px;
  color: #595959;
  margin-bottom: 21px;
`;

const StatisticsWrapper = styled.div`
  display: flex;
  margin-top: 15px;
`;
