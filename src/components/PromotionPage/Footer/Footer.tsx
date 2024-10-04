import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom'; // useLocation 임포트
import styled from 'styled-components';
import defaultFooterLogo from '@/assets/images/PP-Header/studioeye.png';
import { getCompanyBasic, getCompanyLogo } from '@/apis/PromotionPage/company';

type ICompanyBasic = {
  address: string;
  phone: string;
  fax: string;
};

const Footer = () => {
  const { data: companyBasicData } = useQuery<ICompanyBasic>(['getCompanyBasic'], getCompanyBasic, {
    staleTime: 1000 * 60 * 10,
  });
  const { data: companyLogoData } = useQuery<string>(['getCompanyLogo'], getCompanyLogo, {
    staleTime: 1000 * 60 * 10,
  });

  const location = useLocation();
  const isRecruitmentPage = location.pathname === '/recruitment'; // 경로 확인

  const addressData = companyBasicData ? companyBasicData.address : '서울 성동구 광나루로 162';
  const phoneData = companyBasicData ? companyBasicData.phone : '02-000-0000';
  const faxData = companyBasicData ? companyBasicData.fax : '000-0000';

  return (
    <Container isRecruitmentPage={isRecruitmentPage}>
      <BasicInfoWrapper>
        <div>
          <h1>{addressData}</h1>
        </div>
        <div>
          <h2>T. {phoneData}</h2>
          <h2>F. {faxData}</h2>
        </div>
      </BasicInfoWrapper>
      <ImgInfoWrapper>
        <div>
          <img
            src={companyLogoData ? companyLogoData : defaultFooterLogo}
            alt="회사 로고"
          />
        </div>
        <div>
          <h1>COPYRIGHTⓒSTUDIOEYE,LTD. ALL RIGHTS RESERVED </h1>
        </div>
      </ImgInfoWrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div<{ isRecruitmentPage: boolean }>`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0.1px solid ${({ isRecruitmentPage }) => (isRecruitmentPage ? '#000000' : '#777777')};
  background-color: ${({ isRecruitmentPage }) => (isRecruitmentPage ? '#FFFFFF' : '#000000')}; 
  color: ${({ isRecruitmentPage }) => (isRecruitmentPage ? '#000000' : '#777777')}; 
  padding: 65px 52px;
  box-sizing: border-box;

  h1, h2 {
    font-family: 'pretendard-bold';
    font-size: 20px;
    color: ${({ isRecruitmentPage }) => (isRecruitmentPage ? '#000000' : '#777777')};
  }

  img {
    opacity: 0.5;
    height: 60px;
    object-fit: cover;
  }
`;

const BasicInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: space-between;
  margin-bottom: 35px;
  div {
    display: flex;
  }
`;

const ImgInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
