import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Home } from '@/assets/images/PA-Navigation/home.svg';
import { ReactComponent as Request } from '@/assets/images/PA-Navigation/request.svg';
import { ReactComponent as Artwork } from '@/assets/images/PA-Navigation/artwork.svg';
import { ReactComponent as PageEdit } from '@/assets/images/PA-Navigation/pageEdit.svg';

import { ReactComponent as Faq } from '@/assets/images/PA-Navigation/faq.svg';
import { ReactComponent as Recruitment } from '@/assets/images/PA-Navigation/recruitment.svg';
import { ReactComponent as News } from '@/assets/images/PA-Navigation/news.svg';
import PALogo from '@/assets/images/PA-Navigation/pa-logo.png';
import NavBtn from './NavBtn';
import Logout from './Logout';
import { PA_ROUTES } from '@/constants/routerConstants';

const linksData = [
  {
    path: PA_ROUTES.HOME,
    pathName: 'Home',
    svgComponent: <Home width={20} height={20} />,
  },
  {
    path: PA_ROUTES.REQUEST,
    pathName: 'Request',
    svgComponent: <Request width={20} height={20} />,
  },
  {
    path: PA_ROUTES.ARTWORK,
    pathName: 'Artwork',
    svgComponent: <Artwork width={20} height={20} />,
  },
  {
    path: `${PA_ROUTES.DATA_EDIT}/ceo`,
    pathName: 'Data Edit',
    svgComponent: <PageEdit width={20} height={20} />,
  },
  {
    path: PA_ROUTES.FAQ,
    pathName: 'Faq',
    svgComponent: <Faq width={20} height={20} />,
  },
  {
    path: PA_ROUTES.NEWS,
    pathName: 'News',
    svgComponent: <News width={20} height={20} />,
  },
  {
    path: PA_ROUTES.RECRUITMENT,
    pathName: 'Recruitment',
    svgComponent: <Recruitment width={20} height={20} />,
  },
];

const index = () => {
  return (
    <Container>
      <LogoImg src={PALogo} alt='pa-logo' />
      <NavWrapper>
        {linksData.map((link, index) => (
          <div>
            <NavBtn key={index} path={link.path} pathName={link.pathName} svgComponent={link.svgComponent} />
          </div>
        ))}
      </NavWrapper>
      <LogoutWrapper>
        <Logout />
      </LogoutWrapper>
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 127px;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 30;
  background-color: #fbfbfb;
  box-shadow: 0px 0px 20px #00000025;
`;

const LogoImg = styled.img`
  width: 99px;
  height: 33px;
  object-fit: contain;
  padding-top: 33px;
`;

const NavWrapper = styled.div``;

const LogoutWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;
