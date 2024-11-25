import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { dataUpdateState } from '@/recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type Props = {
  path: string;
  pathName: string;
  svgComponent: React.ReactNode;
};

const NavBtn = ({ path, pathName, svgComponent }: Props) => {
  const isUpdate = useRecoilValue(dataUpdateState);
  const setupdate = useSetRecoilState(dataUpdateState);
  const location = useLocation();

  const updateHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isUpdate && !window.confirm('현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?')) {
      //나가지 않을 경우 isUpdate=true, 페이지 유지
      event.preventDefault();
    } else {
      //나갈 경우 isUpdate=false, 페이지 변경
      setupdate(false);
      /**작은 메모
       * else 안에 쓰지 않으면 무조건 false로 만들어서
       * 두번째 이동부터 체크를 안 하고 넘어감
       * */
    }
  };
  const isActiveGroup = (currentPath: string, targetPath: string) => {
    // 특정 경로 그룹 (dataEdit 포함된 모든 경로)을 활성화로 처리
    if (targetPath.includes('/dataEdit')) {
      return currentPath.startsWith('/promotion-admin/dataEdit');
    }
    return currentPath === targetPath;
  };

  return (
    <LinkStyle to={path} onClick={updateHandler} className={isActiveGroup(location.pathname, path) ? 'active' : ''}>
      <SvgContainer>{svgComponent}</SvgContainer>
      <Name>{pathName}</Name>
    </LinkStyle>
  );
};

export default NavBtn;

const LinkStyle = styled(NavLink)`
  width: 127px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #595959;
  text-decoration: none;
  &:hover,
  &.active {
    color: #ffa900;
    background-color: #f1f1f3;
    svg {
      stroke: #ffa900;
      transition: all ease-in-out 300ms;
    }
  }
  transition: all ease-in-out 300ms;
`;

const SvgContainer = styled.div`
  object-fit: contain;
  stroke: #595959;
  fill: #595959;
`;

const Name = styled.div`
  margin-top: 5px;
  font-family: 'pretendard-semibold';
  font-size: 14px;
`;
