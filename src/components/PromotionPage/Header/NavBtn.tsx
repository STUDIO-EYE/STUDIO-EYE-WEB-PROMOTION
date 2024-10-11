import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
  pathName: string;
};

const NavBtn = ({ path, pathName }: Props) => {
  return (
    <LinkStyle to={path}>
      <Name>{pathName}</Name>
    </LinkStyle>
  );
};

export default NavBtn;

const LinkStyle = styled(NavLink)`
  text-decoration: none;
`;

const Name = styled.div`
  @media only screen and (max-width: 1024px) {
    // tablet
    font-size: 3.375rem;
  }

  @media only screen and (max-width: 768px) {
    // mobile
    font-size: 2.375rem;
  }
  font-size: 3.575rem; // 70px -> 4.375rem
  color: white;
  font-family: 'pretendard-bold';
`;
