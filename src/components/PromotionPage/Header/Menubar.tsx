import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ppHeaderState } from '@/recoil/atoms';
import { theme } from '@/styles/theme';
import { useLocation } from 'react-router-dom'; // useLocation 임포트

const Menubar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(ppHeaderState);
  const location = useLocation();

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const isRecruitmentPage = location.pathname === '/recruitment';

  return (
    <ToggleContainer className={isMenuOpen ? 'active' : ''} onMouseDown={toggleMenu} isRecruitmentPage={isRecruitmentPage}>
      <span></span>
      <span></span>
      <span></span>
    </ToggleContainer>
  );
};

export default Menubar;

const ToggleContainer = styled.div<{ isRecruitmentPage: boolean }>`
  width: fit-content;
  @media ${theme.media.tablet} {
    top: 2.4rem;
    scale: 0.9;
  }
  @media ${theme.media.mobile} {
    scale: 0.6;
    top: 2rem;
  }
  display: block;
  cursor: pointer;
  position: fixed;

  top: 2.5rem;
  right: 1rem;
  z-index: 200;
  transform: translate(-50%, -50%);

  span {
    display: block;
    background: ${({ isRecruitmentPage }) => (isRecruitmentPage ? '#ffa900' : '#fff')}; // 색상 변경
    width: 2.625rem;
    height: 0.25rem;
    border-radius: 0.1875rem;
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    margin-bottom: 0.5rem;
  }

  span:nth-child(3) {
    margin-top: 0.5rem;
  }

  &.active span:nth-child(1) {
    transform: translateY(0.75rem) rotate(45deg);
  }

  &.active span:nth-child(2) {
    opacity: 0;
  }

  &.active span:nth-child(3) {
    transform: translateY(-0.75rem) rotate(-45deg);
  }
`;
