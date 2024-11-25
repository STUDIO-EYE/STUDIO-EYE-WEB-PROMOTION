import React, { useEffect, useRef, useState } from 'react';
import defaultLogo from '@/assets/images/PP-Header/studioeyeyellow.png';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ppHeaderScrolledState, ppHeaderState } from '@/recoil/atoms';
import { NavLink, useLocation } from 'react-router-dom';
import HeaderDetail from './HeaderDetail';
import Menubar from './Menubar';
import { motion, AnimatePresence } from 'framer-motion';
import { getCompanyLogoData } from '../../../apis/PromotionAdmin/dataEdit';
import { theme } from '@/styles/theme';

interface ContainerProps {
  isScrolled: boolean;
  isRecruitmentPage: boolean; // 새로운 prop 추가
}
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(ppHeaderState);
  const [isScrolled, setIsScrolled] = useRecoilState(ppHeaderScrolledState);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [companyLightLogo, setCompanyLightLogo] = useState<string>('');
  const [companyDarkLogo, setCompanyDarkLogo] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightLogoData = await getCompanyLogoData(true);
        if (lightLogoData) {
          setCompanyLightLogo(lightLogoData);
        } else {
          setCompanyLightLogo(defaultLogo);
        }

        const darkLogoData = await getCompanyLogoData(false);
        if (darkLogoData) {
          setCompanyDarkLogo(darkLogoData);
        } else {
          setCompanyDarkLogo(defaultLogo);
        }
      } catch (error) {
        console.error('Error fetching company data: ', error);
        setCompanyLightLogo(defaultLogo);
        setCompanyDarkLogo(defaultLogo);
      }
    };

    fetchData();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 3.125); // 50px => 3.125rem
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const disableScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };
    disableScroll();
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isRecruitmentPage = location.pathname === '/recruitment';

  return (
    <>
      <Container ref={headerRef} isScrolled={isScrolled} isRecruitmentPage={isRecruitmentPage}>
        {' '}
        {/* isRecruitmentPage 전달 */}
        <HeaderContainer>
          <HomeLinkWrapper to={'/'}>
            {/* 조건부로 로고 변경 */}
            <LogoImg src={isRecruitmentPage ? companyDarkLogo : companyLightLogo} alt='Company Logo' />
          </HomeLinkWrapper>
        </HeaderContainer>
        <AnimatePresence>
          {isMenuOpen && (
            <HeaderDetailContainer
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%', transition: { duration: 0.8 } }}
              transition={{ delay: 0.2, ease: 'easeInOut' }}
            >
              <LinkWrapper>
                <HeaderDetail />
              </LinkWrapper>
            </HeaderDetailContainer>
          )}
        </AnimatePresence>
      </Container>{' '}
      <Menubar />
    </>
  );
};

export default Header;

const Container = styled.div<ContainerProps>`
  width: 100vw;
  height: 5rem; // 80px -> 5rem

  padding: 0.9375rem 2.5rem; // 15px 40px -> 0.9375rem 2.5rem
  @media ${theme.media.mobile} {
    padding: 0.4375rem 0.9rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${({ isScrolled, isRecruitmentPage }) =>
    isRecruitmentPage
      ? 'transparent'
      : isScrolled
        ? 'rgba(0,0,0,0.1)'
        : 'transparent'}; // recruitment 페이지에서 투명하게
  backdrop-filter: ${({ isScrolled }) => (isScrolled ? 'blur(15px)' : 'none')};
  position: fixed;
  z-index: 100;
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 101;
`;

const HeaderDetailContainer = styled(motion.div)`
  width: 32.5625rem; // 521px -> 32.5625rem
  height: 100vh;
  background-color: black;
  backdrop-filter: blur(1.875rem); // 30px -> 1.875rem
  position: fixed;
  top: 0;
  right: 0;
  z-index: 110;
  padding: 2.5rem; // 40px -> 2.5rem
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${theme.media.tablet} {
    // tablet
    width: 28.8125rem; // 301px -> 18.8125rem
  }

  @media ${theme.media.mobile} {
    // mobile
    width: 100%;
  }
`;

const HomeLinkWrapper = styled(NavLink)``;

const LinkWrapper = styled.div``;

const LogoImg = styled.img`
  height: 3.75rem; // 60px -> 3.75rem
  object-fit: cover;
  @media ${theme.media.tablet} {
    height: 2.7rem;
  }
  @media ${theme.media.mobile} {
    height: 2rem;
  }
`;
