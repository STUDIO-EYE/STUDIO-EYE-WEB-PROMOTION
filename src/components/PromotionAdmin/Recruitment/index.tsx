import React, { useEffect } from 'react';
import { PA_ROUTES } from '@/constants/routerConstants';
import styled from 'styled-components';
import NavBtn from './NavBtn';
import { useLocation, useNavigate } from 'react-router-dom';

const linksData = [
  {
    path: `${PA_ROUTES.RECRUITMENT}/manage`,
    relatedPaths: `${PA_ROUTES.RECRUITMENT}/write`,
    pathName: 'Recruitment',
  },
  {
    path: `${PA_ROUTES.RECRUITMENT}/benefit/manage`,
    relatedPaths: `${PA_ROUTES.RECRUITMENT}/benefit/write`,
    pathName: 'Benefit',
  },
];

function DetailNavigator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 리로드되었을 때, location.pathname에 따라 조건을 설정
    if (location.pathname === `${PA_ROUTES.RECRUITMENT}/benefit/manage`) {
      navigate(`${PA_ROUTES.RECRUITMENT}/benefit/manage`);
    }
  }, [location.pathname, navigate]);

  return (
    <Wrapper>
      <SideBar>
        {linksData.map((link, index) => {
          const isActive =
            location.pathname === link.path || location.pathname === link.relatedPaths;

          return (
            <NavBtn
              key={index}
              path={link.path}
              pathName={link.pathName}
              isActive={isActive}
            />
          );
        })}
      </SideBar>
    </Wrapper>
  );
}

export default DetailNavigator;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.color.white.light};
  position: fixed;
  left: 120px;
  width: 100%;
  top: 80px;
  z-index: 2;
`;

const SideBar = styled.div`
  display: flex;
  width: 100%;
`;
