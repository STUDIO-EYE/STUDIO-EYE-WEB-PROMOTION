import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { ppHeaderState } from '@/recoil/atoms';
import { useLocation } from 'react-router-dom';

const Menubar = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(ppHeaderState);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isRecruitmentPage = location.pathname === '/recruitment';

  return (
    <ToggleContainer className={isMenuOpen ? 'active' : ''} onClick={toggleMenu}>
      <Span isRecruitmentPage={isRecruitmentPage} />
      <Span isRecruitmentPage={isRecruitmentPage} />
      <Span isRecruitmentPage={isRecruitmentPage} />
    </ToggleContainer>
  );
};

export default Menubar;

const ToggleContainer = styled.div`
  display: block;
  cursor: pointer;
  z-index: 150;
  transform: translate(-50%, -50%);
  margin-top: 25px;
`;

const Span = styled.span<{ isRecruitmentPage: boolean }>`
  display: block;
  background: ${({ isRecruitmentPage }) => (isRecruitmentPage ? '#FFA900' : 'white')}; // 배경 색상 조건부 적용
  width: 42px;
  height: 4px;
  border-radius: 3px;
  transition:
    0.25s margin 0.25s,
    0.25s transform;

  &:nth-child(1) {
    margin-bottom: 8px;
  }

  &:nth-child(3) {
    margin-top: 8px;
  }

  &.active:nth-child(1) {
    margin-top: 8px;
    margin-bottom: -4px;
    transform: rotate(45deg);
  }

  &.active:nth-child(2) {
    transform: rotate(45deg);
  }

  &.active:nth-child(3) {
    margin-top: -4px;
    transform: rotate(135deg);
  }
`;
