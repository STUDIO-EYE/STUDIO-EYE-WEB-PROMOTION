import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

type Props = {
  path: string;
  pathName: string;
  isActive: boolean;  // 여기서 isActive 타입을 추가
};

const NavBtn = ({ path, pathName, isActive }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useRecoilState(dataUpdateState);

  // 클릭 핸들러 함수
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (location.pathname === path) {
      // 현재 경로와 이동할 경로가 같으면 confirm을 띄우지 않음
      return;
    }

    // 편집 중일 경우, 확인 메시지 출력
    if (isEditing) {
      const confirmNavigation = window.confirm(MSG.CONFIRM_MSG.EXIT);
      if (confirmNavigation) {
        navigate(path);
        setIsEditing(false);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <LinkStyle onClick={handleClick} isActive={isActive}>
      <Name>{pathName}</Name>
    </LinkStyle>
  );
};

export default NavBtn;

// 스타일 컴포넌트 정의
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

  /* 강제로 border-bottom 스타일 적용 */
  ${(props) =>
    !props.isActive &&
    `
    border-bottom: none;
  `}
`;


const Name = styled.div`
  margin-top: 5px;
  font-family: 'pretendard-semibold';
  font-size: 14px;
`;
