import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import Navigation from '../Navigation';
import backgroundImg from '@/assets/images/backgroundImg.png';
import { authState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import ScrollToTop from '@/hooks/useScrollToTop';

const Layout = () => {
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (!auth.accessToken || !auth.userId) {
      alert('접근 권한이 없습니다.');
      navigate('/', { replace: true });
    }
  }, [auth]);
  return (
    <Container>
      <ScrollToTop />
      <Navigation />
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  padding-bottom: 200px;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 340px 400px;
  background-position: calc(100% - 150px) calc(100vh - 450px);
  background-color: #f9fafc;
`;

const BodyWrapper = styled.div`
  margin-left: 157px;
  margin-right: 157px;
  padding-top: 129px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
