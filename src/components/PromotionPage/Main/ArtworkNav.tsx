import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '@/styles/theme';

interface ArtworkNavProps {
  count: number;
  scrollToSection: (index: number) => void;
  activeIndex: number;
}

const ArtworkNav: React.FC<ArtworkNavProps> = ({ count, scrollToSection, activeIndex }) => {
  const handleClick = (index: number) => {
    scrollToSection(index);
  };

  return (
    <NavWrapper>
      {[...Array(count)].map((_, index) => (
        <NavItemWrapper key={index}>
          <NavItem
            active={index === activeIndex}
            onClick={() => handleClick(index)}
          />
          <IndexNumber visible={index === activeIndex}>0{index + 1}</IndexNumber>
        </NavItemWrapper>
      ))}
    </NavWrapper>
  );
};

export default ArtworkNav;

const NavWrapper = styled.div`
font-family: 'pretendard';
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 3%;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media ${theme.media.mobile} {
    top: 70%;
  }
`;

const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NavItem = styled(motion.div)<{ active: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? 'white' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: white;
    transform: scale(1.3);
    z-index: 1000;
  }
`;

const IndexNumber = styled.div<{ visible: boolean }>`
font-weight: 600;
  position: relative;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
