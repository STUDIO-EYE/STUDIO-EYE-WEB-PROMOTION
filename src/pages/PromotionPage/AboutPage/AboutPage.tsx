import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCEOData, getPartnersData } from '../../../apis/PromotionAdmin/dataEdit';
import NetflixLogo from '@/assets/images/PP/Netflix-Logo.jpg';
import CJLogo from '@/assets/images/PP/CJ_ENM_Logo.png';
import LocomoLogo from '@/assets/images/Locomo.png';
import defaultCEOLogo from '@/assets/images/PP/studioeye_ceo.png';
import { CEO_DATA } from '@/constants/introdutionConstants';

import IntroPage from './IntroPage';
import WhatWeDoPage from './WhatWeDoPage';
import { theme } from '@/styles/theme';
import { useMediaQuery } from 'react-responsive';

interface IContainerStyleProps {
  backgroundColor?: string;
}
interface ICEOInfoData {
  id: number;
  name: string;
  introduction: string;
  imageFileName: string;
  imageUrl: string;
}
interface ICorpInfoData {
  partnerInfo: {
    id: number;
    is_main: boolean;
    link: string;
  };
  logoImg: string;
}

const AboutPage = () => {
  const defaultCEOData: ICEOInfoData = {
    id: 1,
    name: CEO_DATA.CEO_Name,
    introduction: CEO_DATA.CEO_Instruction,
    imageFileName: defaultCEOLogo,
    imageUrl: defaultCEOLogo,
  };

  const defaultCorpData: ICorpInfoData[] = [
    {
      partnerInfo: {
        id: 1,
        is_main: true,
        link: 'https://www.netflix.com/browse',
      },
      logoImg: LocomoLogo,
    },
    // {
    //   partnerInfo: {
    //     id: 2,
    //     is_main: true,
    //     link: 'https://www.netflix.com/browse',
    //   },
    //   logoImg: CJLogo,
    // },
  ];
  const isMobile = useMediaQuery({ query: `(max-width: ${theme.mediaSize.mobile}px)` });
  const [CEOData, setCEOData] = useState<ICEOInfoData>(defaultCEOData);
  const [corpInfoData, setCorpInfoData] = useState<ICorpInfoData[]>(defaultCorpData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [CEODataResponse, corpDataResponse] = await Promise.all([getCEOData(), getPartnersData()]);

        // CEO 데이터 처리
        if (CEODataResponse) {
          const ceoInfo = CEODataResponse;
          const object1 = {
            id: ceoInfo.id || defaultCEOData.id,
            name: ceoInfo.name || defaultCEOData.name,
            introduction: ceoInfo.introduction || defaultCEOData.introduction,
            imageFileName: ceoInfo.imageFileName || defaultCEOData.imageFileName,
            imageUrl: ceoInfo.imageUrl || defaultCEOData.imageUrl,
          };
          setCEOData(object1);
        }

        // 기업 정보 데이터 처리
        if (corpDataResponse) {
          const objects2 = corpDataResponse
            .filter((item: any) => item.partnerInfo.is_main === true)
            .map((item: any) => ({
              partnerInfo: item.partnerInfo,
              logoImg: item.logoImg || defaultCorpData[0].logoImg,
            }));
          setCorpInfoData(objects2.length > 0 ? objects2 : defaultCorpData); // 데이터 없으면 디폴트 데이터 사용
        }
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setCEOData(defaultCEOData);
        setCorpInfoData(defaultCorpData); // 에러 시 디폴트 데이터
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollContainer>
      <IntroPage />
      <WhatWeDoPage />
      <Section data-cy='about-section'>
        {CEOData.id !== -1 ? (
          <RowContainer
            data-cy='ceo-info'
            backgroundColor='#1a1a1a'
            style={isMobile ? { flexDirection: 'column-reverse' } : {}}
          >
            <CeoInfoContainer data-cy='ceo-info-container'>
              <CeoNameInfo data-cy='ceo-name'>CEO&nbsp;{CEOData.name}</CeoNameInfo>
              <CeoInfo data-cy='ceo-introduction'>
                {isMobile ? CEOData.introduction.replace(/\n/g, ' ') : CEOData.introduction}
              </CeoInfo>
            </CeoInfoContainer>
            <CeoImageContainer data-cy='ceo-image-container'>
              <img data-cy='ceo-image' src={CEOData.imageUrl} alt='CEO Character' />
            </CeoImageContainer>
          </RowContainer>
        ) : (
          <div data-cy='ceo-no-data'>CEO 정보가 없습니다.</div>
        )}
      </Section>
      <Section data-cy='corp-section'>
        {corpInfoData.length !== 0 ? (
          <CorpLogoContainer data-cy='corp-logo-container'>
            <CorpText data-cy='corp-title'>CORP</CorpText>
            <CorpLogoRowContainer data-cy='corp-logo-row'>
              {corpInfoData.map((info) => (
                <CorpLogoItem data-cy='company-image' key={info.partnerInfo.id}>
                  <img
                    src={info.logoImg}
                    alt='CORP Logo'
                    data-link={info.partnerInfo.link ? 'true' : 'false'}
                    onClick={() => {
                      if (info.partnerInfo.link) {
                        window.open(info.partnerInfo.link, '_blank');
                      }
                    }}
                  />
                </CorpLogoItem>
              ))}
            </CorpLogoRowContainer>
          </CorpLogoContainer>
        ) : (
          <div data-cy='company-no-data'>기업 정보가 없습니다.</div>
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
