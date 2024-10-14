import React, { useEffect } from 'react';
import Header from '@/components/PromotionPage/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToTop from '@/hooks/useScrollToTop';
import Footer from '../Footer/Footer';
import { putViewIncrease } from '@/apis/PromotionAdmin/dashboard';
import { theme } from '@/styles/theme';
import { PP_ROUTES_CHILD } from '@/constants/routerConstants';
import { ArtworkCategory, CategoryType, Menu, MenuType } from '@/constants/cookiesName';

const Layout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const pathsWithoutFooter = ['/contact'];

  const hideFooter = pathsWithoutFooter.includes(location.pathname);

  useEffect(() => {
    const increaseView = async (cookieName: string, filter: any) => {
      // 해당 이름의 쿠키가 존재하지 않으면 조회수를 증가시킴
      if (!document.cookie.includes(cookieName)) {
        try {
          // 조회수 증가 API 호출
          if (filter.menu !== MenuType.ARTWORK) {
            filter.category = 'ALL';
          }
          await putViewIncrease(filter);
          // 쿠키 설정 (유효기간 1일)
          const date = new Date();
          date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
          const expires = `expires=${date.toUTCString()}`;
          document.cookie = `${cookieName}=true;${expires};path=/`;

          console.log('조회수 증가 완료');
        } catch (error) {
          console.error('조회수 증가 에러:', error);
        }
      }
    };
    let cookieName = '';
    const filter = { menu: '', category: '' };
    switch (location.pathname) {
      case `/${PP_ROUTES_CHILD.MAIN}`:
        cookieName = Menu.MAIN;
        filter.menu = MenuType.MAIN;
        break;
      case `/${PP_ROUTES_CHILD.ABOUT}`:
        cookieName = Menu.ABOUT;
        filter.menu = MenuType.ABOUT;
        break;
      case `/${PP_ROUTES_CHILD.ARTWORK}`:
        switch (category) {
          case '1':
            cookieName = ArtworkCategory.ENTERTAINMENT;
            filter.category = CategoryType.ENTERTAINMENT;
            break;
          case '2':
            cookieName = ArtworkCategory.DRAMA;
            filter.category = CategoryType.DRAMA;
            break;
          case '3':
            cookieName = ArtworkCategory.DOCUMENTARY;
            filter.category = CategoryType.DOCUMENTARY;
            break;
          case '4':
            cookieName = ArtworkCategory.CHANNEL;
            filter.category = CategoryType.CHANNEL;
            break;
          case '5':
            cookieName = ArtworkCategory.BRANDED;
            filter.category = CategoryType.BRANDED;
            break;
          case '6':
            cookieName = ArtworkCategory.MOTION_GRAPHIC;
            filter.category = CategoryType.MOTION_GRAPHIC;
            break;
          case '7':
            cookieName = ArtworkCategory.ANIMATION;
            filter.category = CategoryType.ANIMATION;
            break;
          case '8':
            cookieName = ArtworkCategory.LIVE_COMMERCE;
            filter.category = CategoryType.LIVE_COMMERCE;
            break;
          default:
            cookieName = ArtworkCategory.ALL;
            filter.category = CategoryType.ALL;
            break;
        }
        filter.menu = MenuType.ARTWORK;
        break;
      case `/${PP_ROUTES_CHILD.CONTACT}`:
        cookieName = Menu.CONTACT;
        filter.menu = MenuType.CONTACT;
        break;
      case `/${PP_ROUTES_CHILD.FAQ}`:
        cookieName = Menu.FAQ;
        filter.menu = MenuType.FAQ;
        break;
      case `/${PP_ROUTES_CHILD.NEWSBOARD}`:
        cookieName = Menu.NEWS;
        filter.menu = MenuType.NEWS;
        break;
      case `/${PP_ROUTES_CHILD.RECRUITMENT}`:
        cookieName = Menu.RECRUITMENT;
        filter.menu = MenuType.RECRUITMENT;
        break;
      default:
        break; //여기 main 넣어도 됨
    }
    increaseView(cookieName, filter);
  }, [location.pathname, location.search]);

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

const Container = styled.div`'
  background-color: black;
  width: 100%;
  color: white;
`;

const BodyWrapper = styled.div`
flex: 1; /* BodyWrapper가 남은 공간을 차지하도록 설정 */
  box-sizing: border-box;
  //margin-bottom: 10rem;
`;


