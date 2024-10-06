import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '@/components/PromotionAdmin/Recruitment/index';
import { PA_ROUTES } from '@/constants/routerConstants';
import styled from 'styled-components';

const index = () => {
  return (
    <>
      <Navigate to={`${PA_ROUTES.RECRUITMENT}/manage`} />
      <Navigation />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default index;

const Layout = styled.div`
  margin-top: 60px;
`;
