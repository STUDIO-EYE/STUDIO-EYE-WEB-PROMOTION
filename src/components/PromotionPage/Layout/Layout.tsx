import React, { useEffect } from 'react';
import Header from '@/components/PromotionPage/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToTop from '@/hooks/useScrollToTop';
import Footer from '../Footer/Footer';
import { putViewIncrease } from '@/apis/PromotionAdmin/dashboard';

const Layout = () => {
  const location = useLocation();

  const pathsWithoutFooter = ['/contact'];

  const hideFooter = pathsWithoutFooter.includes(location.pathname);
  useEffect(() => {
    const increaseView = async () => {
      // 조회수를 관리하는 쿠키 이름
      const COOKIE_NAME = 'viewed_cookie';

      // 쿠키가 존재하지 않으면 조회수를 증가시킴
      if (!document.cookie.includes(COOKIE_NAME)) {
        try {
          // 조회수 증가 API 호출
          await putViewIncrease();

          // 쿠키 설정 (유효기간 1일)
          const date = new Date();
          date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
          const expires = `expires=${date.toUTCString()}`;
          document.cookie = `${COOKIE_NAME}=true;${expires};path=/`;

          console.log('조회수 증가 완료');
        } catch (error) {
          console.error('조회수 증가 에러:', error);
        }
      }
    };
    increaseView();
  }, []);
  return (
    <Container>
      <ScrollToTop />
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
      {!hideFooter && <Footer />}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  background-color: black;
  width: 100%;
  color: white;
`;

const BodyWrapper = styled.div`
  margin-bottom: 10rem;
`;


