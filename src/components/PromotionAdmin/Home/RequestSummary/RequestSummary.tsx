import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from '@/assets/images/PA-Navigation/request.svg';
import WaitingRequestsList from './WaitingRequestsList';
import { fetchWaitingRequests } from '@/apis/PromotionAdmin/dashboard';
import { WaitingRequestData } from '@/types/PromotionAdmin/statistics';
import { ReactComponent as Sort } from '@/assets/images/sortImg.svg';
import { useQuery } from 'react-query';

const WatingRequests = () => {
  const { data, isLoading } = useQuery<WaitingRequestData[]>(['waitingRequest'], fetchWaitingRequests);
  const [sortByRecent, setSortByRecent] = useState(true);
  const sortedData =
    data && data.length > 0
      ? data.slice().sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return sortByRecent ? dateB - dateA : dateA - dateB;
        })
      : [];

  const handleSort = () => {
    setSortByRecent((prev) => !prev);
  };

  return (
    <Container>
      <HeaderWrapper>
        <TitleWrapper>
          <div>
            <Icon width={20} height={20} stroke='#595959' />
            <h1>의뢰 통계 요약</h1>
          </div>
          <span>승인 대기 의뢰 총 {data && data.length > 0 ? data.length : 0}건</span>
        </TitleWrapper>
        <BtnWrapper>
          <SortWrapper onClick={handleSort} rotate={!sortByRecent}>
            <SortNameWrapper>{sortByRecent ? '최신순' : '오래된 순'}</SortNameWrapper>
            <Sort width={20} height={20} />
          </SortWrapper>
        </BtnWrapper>
      </HeaderWrapper>
      <BodyWrapper>
        {isLoading ? (
          <LoadingWrapper>Loading...</LoadingWrapper>
        ) : sortedData && sortedData.length > 0 ? (
          sortedData.map((request) => (
            <WaitingRequestsList
              key={request.id}
              organization={request.organization}
              clientName={request.clientName}
              description={request.description}
              category={request.category}
              date={request.createdAt}
              email={request.email}
              requestId={request.id.toString()}
              hoverBackgroundColor={'#afafaf1d'}
            />
          ))
        ) : (
          <NoDataWrapper>😊 대기 중인 의뢰가 없습니다.</NoDataWrapper>
        )}
      </BodyWrapper>
    </Container>
  );
};

export default WatingRequests;

const Container = styled.div`
  width: 100%;
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

  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;
`;
const TitleWrapper = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: flex-end;
  div {
    display: flex;
    align-items: center;
  }
  h1 {
    font-family: 'pretendard-semibold';
    font-size: 18px;
    color: #595959;
    margin-left: 10px;
    margin-right: 15px;
  }
  span {
    font-family: 'pretendard-semibold';
    font-size: 13px;
    color: #aaaaaa;
  }
`;

const BodyWrapper = styled.div`
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 350px;
  overflow-y: auto;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const SortWrapper = styled.button<{ rotate: boolean }>`
  border-style: none;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 0.1px solid #87878771;
  border-radius: 3px;
  width: 102px;
  height: 31px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    background-color: #afafaf1d;
    transition: all ease-in-out 200ms;
  }
  svg {
    transform: ${(props) => (props.rotate ? 'rotate(180deg)' : 'none')};
    transition: all 300ms ease-in-out;
  }
`;

const SortNameWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 13px;
  color: #595959;
`;

const BtnWrapper = styled.div`
  display: flex;
`;
