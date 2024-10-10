import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

type Props = {
  children: React.ReactNode;
};
type YellowCircleProps = {
  top: string;
  left: string;
};

const BackgroundYellowCircle = ({ children }: Props) => {
  return (
    <>
      <YellowCircle top='70%' left='10%' />
      {children}
      <YellowCircle top='30%' left='80%' />
    </>
  );
};

export default BackgroundYellowCircle;
const YellowCircle = styled.div<YellowCircleProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 169, 0, 0.1943);
  box-shadow: 0 0 250px 240px rgba(255, 169, 0, 0.2);
  @media ${theme.media.mobile}  {
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  background-color: rgba(255, 169, 0, 0.1943);
  box-shadow: 0 0 5.5rem 5.5rem rgba(255, 169, 0, 0.2);
  }
`;
