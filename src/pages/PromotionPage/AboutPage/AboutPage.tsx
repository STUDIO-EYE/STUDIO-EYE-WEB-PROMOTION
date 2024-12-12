import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IntroPage from './IntroPage';
import WhatWeDoPage from './WhatWeDoPage';
import { theme } from '@/styles/theme';
import { useMediaQuery } from 'react-responsive';
import { useLoaderData } from 'react-router-dom';
import { AboutPageLoaderData } from '@/types/PromotionPage/about';
import ErrorComponent from '@/components/Error/ErrorComponent';

interface IContainerStyleProps {
  backgroundColor?: string;
}

const AboutPage = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${theme.mediaSize.mobile}px)` });

  const { ceoData, partnersData, companyIntroData, sloganImageUrl, companyDetailData, errors } =
    useLoaderData() as AboutPageLoaderData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (errors.length > 0) {
      setIsModalOpen(true);
    }
  }, [errors]);
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const mainPartnersData = partnersData.filter((info) => info.partnerInfo && info.partnerInfo.isMain);

  return (
    <ScrollContainer>
      {isModalOpen && <ErrorComponent error={errors[0]} onClose={closeModal} />}
      <IntroPage companyIntroData={companyIntroData} sloganImageUrl={sloganImageUrl} />
      <WhatWeDoPage companyDetailData={companyDetailData} />
      <Section data-cy='about-section'>
        {ceoData.id !== -1 ? (
          <RowContainer
            data-cy='ceo-info'
            backgroundColor='#1a1a1a'
            style={isMobile ? { flexDirection: 'column-reverse' } : {}}
          >
            <CeoInfoContainer data-cy='ceo-info-container'>
              <CeoNameInfo data-cy='ceo-name'>CEO&nbsp;{ceoData.name}</CeoNameInfo>
              <CeoInfo data-cy='ceo-introduction'>
                {isMobile ? ceoData.introduction.replace(/\n/g, ' ') : ceoData.introduction}
              </CeoInfo>
            </CeoInfoContainer>
            <CeoImageContainer data-cy='ceo-image-container'>
              <img data-cy='ceo-image' src={ceoData.imageUrl} alt='CEO Character' />
            </CeoImageContainer>
          </RowContainer>
        ) : (
          <div data-cy='ceo-no-data'>CEO 정보가 없습니다.</div>
        )}
      </Section>
      <Section data-cy='corp-section'>
        {mainPartnersData.length !== 0 ? (
          <CorpLogoContainer data-cy='corp-logo-container'>
            <CorpText data-cy='corp-title'>CORP</CorpText>
            <CorpLogoRowContainer data-cy='corp-logo-row'>
              {mainPartnersData.map((info) => (
                <CorpLogoItem data-cy='company-image' key={info.partnerInfo.id}>
                  <img
                    data-cy='partner-image'
                    src={info.logoImg}
                    alt='CORP Logo'
                    data-link={info.partnerInfo.link ? 'true' : 'false'}
                    onClick={() => info.partnerInfo.link && window.open(info.partnerInfo.link, '_blank')}
                  />
                </CorpLogoItem>
              ))}
            </CorpLogoRowContainer>
          </CorpLogoContainer>
        ) : (
          <div data-cy='company-no-data'></div>
        )}
      </Section>
    </ScrollContainer>
  );
};

export default AboutPage;

const ScrollContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  margin-top: 9.375rem;
  margin-bottom: 3.125rem;
  overflow-x: hidden;
  @media ${theme.media.tablet} {
    margin-top: 3rem;
    margin-bottom: 0;
  }
  @media ${theme.media.mobile} {
    margin-top: 5rem;
    margin-bottom: 0;
  }
`;

const RowContainer = styled.div<IContainerStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || 'black'};
  gap: 1vw;
  padding-top: 5rem;
  padding-bottom: 5rem;
  @media ${theme.media.mobile} {
    flex-direction: column;
    margin-top: 5rem;
    padding: 1.5rem;
  }
`;

const CeoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: center;

  @media ${theme.media.mobile} {
    width: 100%;
    text-align: center;
  }
`;

const CeoImageContainer = styled.div`
  img {
    width: 18vw;
    min-width: 13rem;
    object-fit: contain;
  }

  @media ${theme.media.mobile} {
    width: 100%;
    text-align: center;
    padding: 0;
    margin: 0;
    margin-bottom: 0.5rem;

    img {
      width: 8rem;
      height: 8rem;
      object-fit: contain;
    }
  }
`;

const CeoNameInfo = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: clamp(2.5rem, 4vw, 4.375rem);
  margin-bottom: 1.875rem;

  @media ${theme.media.mobile} {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
`;

const CeoInfo = styled.div`
  white-space: pre-line;
  line-height: 1.3;
  margin-bottom: 1.875rem;
  font-family: ${theme.font.regular};
  font-size: clamp(0.8rem, 1.5vw, 1.5rem);
  color: ${theme.color.white.light};

  @media ${theme.media.mobile} {
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

const CorpLogoItem = styled.div`
  flex: 1 1 25%;
  display: flex;
  justify-content: center;
  margin: 10px 0;

  img {
    width: 15vw;
    max-width: 22rem;
    min-width: 6.25rem;
    height: 12vw;
    max-height: 10rem;
    min-height: 3.125rem;
    object-fit: contain;
    cursor: default;

    &[data-link='true'] {
      cursor: pointer;
    }
  }
`;

const CorpLogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CorpLogoRowContainer = styled.a`
  margin-bottom: 5rem;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3.125rem;
  flex-wrap: wrap;
  @media ${theme.media.mobile} {
    width: 95%;
    gap: 0.5rem;
    margin-bottom: 10rem;
    padding: 0;
  }
`;

const CorpText = styled.div`
  margin-bottom: 1.875rem;
  font-family: ${theme.font.regular};
  font-size: clamp(3rem, 5vw, 7.5rem);
  letter-spacing: 5px;
  opacity: 0.2;
  filter: blur(2px);
  color: ${theme.color.white.light};

  @media ${theme.media.mobile} {
    margin-bottom: 1.5rem;
  }
`;
