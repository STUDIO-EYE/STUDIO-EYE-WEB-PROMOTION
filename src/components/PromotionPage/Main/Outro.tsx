import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getClientLogoImgList } from '@/apis/PromotionPage/client';
import ClientRowAnimation from '../Client/ClientRowAnimation';
import WorkWithUs from '../WorkWithUs/WorkWithUs';
import { theme } from '@/styles/theme';

const Outro = () => {
  const { data, isLoading, error } = useQuery<string[], Error>(['clientLogoImgList'], getClientLogoImgList, {});

  return (
    <Container data-cy="outro-section">
      <ClientRowAnimation data-cy="outro_image" data={data} isLoading={isLoading} error={error} />
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
  }

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;
