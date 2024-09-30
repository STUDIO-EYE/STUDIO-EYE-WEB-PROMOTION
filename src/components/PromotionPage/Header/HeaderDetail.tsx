import { PP_ROUTES } from '@/constants/routerConstants';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBtn from './NavBtn';
import { motion } from 'framer-motion';
import { getAllMenuData } from '@/apis/PromotionPage/menu';

const getPathForTitle = (title: string) => {
  switch (title.toLowerCase()) {
    case 'main':
      return PP_ROUTES.MAIN;
    case 'about':
      return PP_ROUTES.ABOUT;
    case 'artwork':
      return PP_ROUTES.ARTWORK;
    case 'contact':
      return PP_ROUTES.CONTACT;
    case 'faq':
      return PP_ROUTES.FAQ;
    default:
      return PP_ROUTES.MAIN;
  }
};

const HeaderDetail = () => {
  const [menuData, setMenuData] = useState<string[]>([]);

  // 메뉴 데이터를 가져오는 함수
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await getAllMenuData();
        const data = response?.data;

        if (Array.isArray(data)) {
          setMenuData(data);
        } else {
          console.error('잘못된 데이터 형식:', response);
          setMenuData([]);
        }
      } catch (error) {
        console.error('메뉴 데이터를 불러오는 중 에러 발생:', error);
        setMenuData([]);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div>
      <NavWrapper>
        {menuData.length > 0 ? (
          menuData.map((title, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0.5, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.5, x: 100 }}
              transition={{ delay: index * 0.15, ease: 'easeIn' }}
            >
              <span>
                <NavBtn
                  path={getPathForTitle(title)}
                  pathName={title} // title을 pathName으로 사용
                />
              </span>
            </motion.li>
          ))
        ) : (
          <p>메뉴를 불러오는 중입니다...</p> // 데이터가 없을 때
        )}
      </NavWrapper>
    </div>
  );
};

export default HeaderDetail;

const NavWrapper = styled.div`
  span {
    position: relative;
    z-index: 1;
  }
  li {
    list-style: none;
    position: relative;
    margin-bottom: 15px;
    line-height: normal;
    color: #fff;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 35%;
      width: 0;
      height: 20px;
      background-color: #ffa900;
      transition: width 0.5s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;