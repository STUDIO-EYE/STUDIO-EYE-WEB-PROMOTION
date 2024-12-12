import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getClientLogoImgList } from '@/apis/PromotionPage/client';
import ClientRowAnimation from '../Client/ClientRowAnimation';
import WorkWithUs from '../WorkWithUs/WorkWithUs';
import { theme } from '@/styles/theme';
import { getClientType } from '@/types/PromotionPage/client';

const Outro = () => {
  const { data, isLoading, error } = useQuery<getClientType[], Error>(['clientLogoImgList'], getClientLogoImgList, {});

  // visibility가 true인 데이터만 필터링 후 logoImg만 추출
  const filteredLogoImgs = data ? data.filter((item) => item.clientInfo.visibility).map((item) => item.logoImg) : [];

  if (isLoading) return <>is Loading...</>;
  if (error) return <>Outro Error: {error.message}</>;
  return (
    <Container data-cy='outro-section'>
      <ClientRowAnimation data={filteredLogoImgs} isLoading={isLoading} error={error} />
      <WorkWithUs />
    </Container>
  );
};

export default Outro;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  box-sizing: border-box;
  margin-top: 40px;
  margin-bottom: 70px;

  @media ${theme.media.tablet} {
    margin-bottom: 3rem;
  }

  @media ${theme.media.mobile} {
    width: 100%;
    // height: calc(100vh-2.75rem);
    height: calc(100dvh - 15rem);
  }

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;
