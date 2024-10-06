import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCEOData, getPartnersData } from '../../../apis/PromotionAdmin/dataEdit';
import NetflixLogo from '@/assets/images/PP/Netflix-Logo.jpg';
import CJLogo from '@/assets/images/PP/CJ_ENM_Logo.png';
import LocomoLogo from '@/assets/images/Locomo.png'
import defaultCEOLogo from '@/assets/images/PP/studioeye_ceo.png';
import { CEO_DATA } from '@/constants/introdutionConstants';

import IntroPage from './IntroPage';
import WhatWeDoPage from './WhatWeDoPage';

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
          <RowCoontainer backgroundColor='#1a1a1a'>
            <CeoInfoContainer>
              <CeoInfo fontFamily='Pretendard-SemiBold' fontSize='70px'>
                CEO&nbsp;{CEOData.name}
              </CeoInfo>
              <CeoInfo dangerouslySetInnerHTML={{ __html: CEOData.introduction }}></CeoInfo>
            </CeoInfoContainer>
            <CeoImageContainer>
              <img
                src={CEOData.imageUrl}
                alt='CEO Character'
                style={{ width: '350px', height: '300px', objectFit: 'contain' }}
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
                    style={{
                      width: '300px',
                      height: '150px',
                      objectFit: 'contain',
                      cursor: info.partnerInfo.link ? 'pointer' : 'default',
                    }}
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
  display: flex;
  flex-direction: column;
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  margin-top: 150px;
  margin-bottom: 50px;
  overflow-x: hidden;
`;
const RowCoontainer = styled.div<IContainerStyleProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || 'black'};
  padding-top: 80px;
  padding-bottom: 80px;
`;

const CeoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: center;
  width: 40%;
`;
const CeoImageContainer = styled.div`
  padding-left: 70px;
`;

const CeoInfo = styled.div<IFontStyleProps>`
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-word;
  line-height: 1.3;
  margin-bottom: 30px;
  font-family: ${(props) => props.fontFamily || 'Pretendard-regular'};
  font-size: ${(props) => props.fontSize || '24px'};
  color: #ffffff;
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
  margin-bottom: 80px;
  width: 80%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 50px;
  flex-wrap: wrap;
`;
const CorpText = styled.div`
  margin-bottom: 30px;
  font-family: 'pretendard-regular';
  font-size: 120px;
  letter-spacing: 5px;
  opacity: 0.2;
  filter: blur(2px);
  color: '#FFFFFF';
`;
