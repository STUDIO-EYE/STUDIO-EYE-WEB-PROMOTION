import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBtn from './NavBtn';
import { motion } from 'framer-motion';
import { getAllMenuData } from '@/apis/PromotionPage/menu';

const HeaderDetail = () => {
  const defaultMenuData = ['ABOUT', 'ARTWORK', 'CONTACT', 'FAQ', 'RECRUITMENT', 'NEWS'];
  const [menuData, setMenuData] = useState<string[]>(defaultMenuData);

  const getPathForTitle = (title: string) => {
    return title ? `/${title.toLowerCase()}` : '/';
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await getAllMenuData();

        if (Array.isArray(data) && data.length > 0) {
          setMenuData(data);
        } else {
          setMenuData(defaultMenuData);
        }
      } catch (error) {
        setMenuData(defaultMenuData);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div>
      <NavWrapper>
        {menuData.length > 0 ? (
          menuData.map((menuTitle, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0.5, x: '6.25rem' }} // 100px -> 6.25rem
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.5, x: '6.25rem' }} // 100px -> 6.25rem
              transition={{ delay: index * 0.15, ease: 'easeIn' }}
            >
              <span>
                <NavBtn path={getPathForTitle(menuTitle)} pathName={menuTitle} />
              </span>
            </motion.li>
          ))
        ) : (
          <p>메뉴를 불러오는 중입니다.</p>
        )}
      </NavWrapper>
    </div>
  );
};

export default HeaderDetail;

const NavWrapper = styled.div`
  span {
    position: relative;
    z-index: 2;
  }
  li {
    list-style: none;
    position: relative;
    margin-bottom: 0.9375rem; // 15px -> 0.9375rem
    line-height: normal;
    color: #fff;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 35%;
      width: 0;
      height: 1.25rem; // 20px -> 1.25rem
      background-color: #ffa900;
      transition: width 0.5s ease-in-out;
    }

    &:hover::after {
      width: 100%;
      z-index:1;
    }
  }
`;
