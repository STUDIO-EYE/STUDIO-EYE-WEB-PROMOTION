import BackDrop from '@/components/Backdrop/Backdrop';
import NewsList from '@/components/PromotionAdmin/News/NewsList';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NewsWritePage from './NewsWritePage/NewsWritePage';
import { useRecoilState } from 'recoil';
import { backdropState } from '@/recoil/atoms';

const Index = () => {
  const [producingIsOpend, setProducingIsOpened] = useRecoilState(backdropState);
  const navigator = useNavigate();

  useEffect(() => {
    
  }, [producingIsOpend]);

  const handleWritingNews=()=>{
    setProducingIsOpened(!producingIsOpend);
  }
  const handleViewNews=(id:number)=>{
    navigator(`${id}`);
  }

  return (
    <>
    {producingIsOpend && <BackDrop children={<NewsWritePage/>} isOpen={producingIsOpend} />}
    <Container data-cy="news-index-container">
        <HeaderWrapper>
        <span style={{marginTop:"auto",marginBottom:"auto"}} data-cy="news-header-title">News 목록</span>
        <SendButton onClick={handleWritingNews} data-cy="news-write-button">글쓰기</SendButton>
        </HeaderWrapper>
        <div style={{display:'flex'}}><NewsList handler={handleViewNews} data-cy="news-list"/>
        <Outlet data-cy="news-outlet" />
        </div>
    </Container>
    </>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width:600px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  font-family: 'pretendard-bold';
  font-size: 20px;
  color: #595959;
  margin-bottom: 21px;
`;

const SendButton = styled.button`
  border-radius: 5px;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 7px 15px;
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #5a6268;
  }
`;