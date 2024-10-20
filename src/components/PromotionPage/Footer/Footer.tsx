import { getCompanyBasic, getCompanyLogo } from '@/apis/PromotionPage/company';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import defaultFooterLogo from '@/assets/images/PP-Header/studioeye.png';
import { COMPANY_DATA } from '@/constants/introdutionConstants';
import { theme } from '@/styles/theme';

type ICompanyBasic = {
  address: string;
  phone: string;
  fax: string;
};

const Footer = () => {
  const location = useLocation();
  const pathWhiteFooter = ['/recruitment'];
  const whiteFooter = pathWhiteFooter.includes(location.pathname);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= theme.mediaSize.mobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: companyBasicData } = useQuery<ICompanyBasic>(['getCompanyBasic'], getCompanyBasic, {
    staleTime: 1000 * 60 * 10,
  });
  const { data: companyLogoData, error } = useQuery<string>(['getCompanyLogo'], getCompanyLogo, {
    staleTime: 1000 * 60 * 10,
  });

  const addressData = companyBasicData ? companyBasicData.address : COMPANY_DATA.Address;
  const phoneData = companyBasicData ? companyBasicData.phone : COMPANY_DATA.Number;
  const faxData = companyBasicData ? companyBasicData.fax : COMPANY_DATA.Number;

  return (
    <Container whiteFooter={whiteFooter}>
      <BasicInfoWrapper>
        <AddressWrapper>
          <span>{addressData}</span>
        </AddressWrapper>
        <NumberWrapper>
          <span>T. {phoneData}</span>
          <span>F. {faxData}</span>
        </NumberWrapper>
      </BasicInfoWrapper>
      <ImgInfoWrapper>
        {isMobile ? (
          <>
            <CopyrightWrapper>
              <span>COPYRIGHTⓒSTUDIOEYE,LTD. ALL RIGHTS RESERVED </span>
            </CopyrightWrapper>{' '}
            <div>
              <img src={companyLogoData ? companyLogoData : defaultFooterLogo} alt='회사 로고' />
            </div>
          </>
        ) : (
          <>
            <div>
              <img src={companyLogoData ? companyLogoData : defaultFooterLogo} alt='회사 로고' />
            </div>
            <CopyrightWrapper>
              <span>COPYRIGHTⓒSTUDIOEYE,LTD. ALL RIGHTS RESERVED </span>
            </CopyrightWrapper>
          </>
        )}
      </ImgInfoWrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div<{ whiteFooter: boolean }>`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 0.006rem solid #777777;
  background-color: ${({ whiteFooter }) => (whiteFooter ? '#fff' : '#ffffff11')};
  backdrop-filter: blur(1.25rem);
  padding: 4.0625rem 3.25rem;
  transition: font-size 0.3s ease;
  box-sizing: border-box;
  @media ${theme.media.tablet} {
  }
  @media ${theme.media.mobile} {
    height: 20rem;
  }

  img {
    opacity: 0.5;
    height: 3.75rem;
    object-fit: cover;
    @media ${theme.media.tablet} {
      height: 2.75rem;
    }
    @media ${theme.media.mobile} {
      height: 2.75rem;
    }
  }
`;

const AddressWrapper = styled.div`
  width: 100%;
  display: flex;
  color: #777777;
  font-family: 'pretendard-bold';
  @media ${theme.media.mobile} {
    justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  @media ${theme.media.tablet} {
    font-size: 1.2rem;
  }
`;

const NumberWrapper = styled.div`
  width: fit-content;
  gap: 1rem;
  font-family: 'pretendard-bold';
  justify-content: space-between;
  color: #777777;
  font-size: 1.3rem;
  display: flex;
  @media ${theme.media.mobile} {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    font-size: 0.5rem;
  }
  @media ${theme.media.tablet} {
    font-size: 1rem;
  }
`;

const BasicInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.1875rem;
  white-space: nowrap;
  height: 20rem;
  font-family: 'pretendard-bold';
  font-size: 1.45rem;
  color: #777777;

  @media ${theme.media.mobile} {
    display: block;
  }
`;

const ImgInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${theme.media.mobile} {
    margin: auto;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CopyrightWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 1.25rem;
  color: #777777;
  @media ${theme.media.tablet} {
    font-size: 1rem;
  }
  @media ${theme.media.mobile} {
    font-size: 0.7rem;
  }
`;
