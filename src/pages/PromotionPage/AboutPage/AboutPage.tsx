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

interface IFontStyleProps {
  fontSize?: string;
  fontFamily?: string;
}
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
      <Section>
        {CEOData.id !== -1 ? (
          <RowCoontainer backgroundColor='#1a1a1a' style={isMobile ? { flexDirection: 'column-reverse' } : {}}>
            <CeoInfoContainer>
              <CeoInfo fontFamily={theme.font.semiBold} fontSize='4.375rem'>
                CEO&nbsp;{CEOData.name}
              </CeoInfo>
              <CeoInfo>
                {isMobile ? (
                  CEOData.introduction.replace(/\n/g, ' ')
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: CEOData.introduction }} />
                )}
              </CeoInfo>
            </CeoInfoContainer>
            <CeoImageContainer>
              <img
                src={CEOData.imageUrl}
                alt='CEO Character'
                style={
                  isMobile
                    ? { width: '8rem', height: '8rem', objectFit: 'contain' }
                    : { width: '21.875rem', height: '18.75rem', objectFit: 'contain' }
                }
              />
            </CeoImageContainer>
          </RowCoontainer>
        ) : (
          <div>CEO 정보가 없습니다.</div>
        )}
      </Section>
      <Section>
        {corpInfoData.length !== 0 ? (
          <CorpLogoContainer>
            <CorpText>CORP</CorpText>
            <CorpLogoRowContainer>
              {corpInfoData.map((info) => (
                <CorpLogoItem key={info.partnerInfo.id}>
                  <img
                    src={info.logoImg}
                    alt='CORP Logo'
                    style={
                      isMobile
                        ? {
                            width: '6.25rem',
                            height: '3.125rem',
                            objectFit: 'contain',
                            cursor: info.partnerInfo.link ? 'pointer' : 'default',
                          }
                        : {
                            width: '18.75rem',
                            height: '9.375rem',
                            objectFit: 'contain',
                            cursor: info.partnerInfo.link ? 'pointer' : 'default',
                          }
                    }
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
          <div>기업 정보가 없습니다.</div>
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
const RowCoontainer = styled.div<IContainerStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || 'black'};
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
  width: 40%;
  @media ${theme.media.mobile} {
    width: 100%;
    text-align: center;
  }
`;
const CeoImageContainer = styled.div`
  padding-left: 70px;
  @media ${theme.media.mobile} {
    text-align: center;
    padding: 0;
    margin-bottom: 0.5rem;
  }
`;

const CeoInfo = styled.div<IFontStyleProps>`
  white-space: pre-line;
  word-wrap: break-word;
  word-break: keep-all;
  line-height: 1.3;
  margin-bottom: 1.875rem;
  font-family: ${(props) => props.fontFamily || theme.font.regular};
  font-size: ${(props) => props.fontSize || '1.5rem'};
  color: ${theme.color.white.light};
  @media ${theme.media.mobile} {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: ${(props) => (props.fontSize ? '2rem' : '1rem')};
    font-family: ${(props) => (props.fontFamily ? props.fontFamily : theme.font.regular)};
  }
`;
const CorpLogoItem = styled.div`
  flex: 1 1 30%;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const CorpLogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CorpLogoRowContainer = styled.a`
  margin-bottom: 5rem;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3.125rem;
  flex-wrap: wrap;
  @media ${theme.media.mobile} {
    width: 95%;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
  }
`;
const CorpText = styled.div`
  margin-bottom: 1.875rem;
  font-family: ${theme.font.regular};
  font-size: 7.5rem;
  letter-spacing: 5px;
  opacity: 0.2;
  filter: blur(2px);
  color: ${theme.color.white.light};
  @media ${theme.media.mobile} {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
`;
