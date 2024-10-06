import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

type Props = {
  path: string;
  pathName: string;
};

const NavBtn = ({ path, pathName }: Props) => {
  const navigator = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.includes(path);
  const [isEditing, setIsEditing] = useRecoilState(dataUpdateState);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (location.pathname === path) {
      // 현재 경로와 이동할 경로가 같으면 confirm을 띄우지 않음
      return;
    }
    if (isEditing) {
      const confirmNavigation = window.confirm(MSG.CONFIRM_MSG.EXIT);
      if (confirmNavigation) {
        navigator(path);
        setIsEditing(false);
      }
    } else {
      navigator(path);
    }
  };
  return (
    <LinkStyle onClick={handleClick} isActive={isActive}>
      <Name>{pathName}</Name>
    </LinkStyle>
  );
};

export default NavBtn;

const LinkStyle = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  width: 127px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #595959;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.symbol};
  }

  ${(props) =>
    props.isActive &&
    `
    border-bottom: 2.5px solid ${props.theme.color.symbol};
  `}
`;

const Name = styled.div`
  margin-top: 5px;
  font-family: 'pretendard-semibold';
  font-size: 14px;
`;
