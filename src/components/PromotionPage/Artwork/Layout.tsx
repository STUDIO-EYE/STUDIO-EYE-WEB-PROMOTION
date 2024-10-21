import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './Navigation';
import { theme } from '@/styles/theme';

const Layout = () => {
  return (
    <Wrapper>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  padding-top: 200px;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.background};
  display: flex;
  justify-content: center;
  position: relative;

  @media ${theme.media.mobile} {
    width: 100vw;
    flex-direction: column;
    align-items: center;
    min-height: fit-content;
  }
`;

const Container = styled.div`
  // padding-left: 370px;
  padding-bottom: 200px;
  width: 80vw;

  @media ${theme.media.mobile} {
    justify-content: center;
    align-items: center;
    padding-bottom: 0;
    width: auto;
  }
`;
