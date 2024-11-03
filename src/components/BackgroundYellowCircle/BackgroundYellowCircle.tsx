import { theme } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

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
  width: clamp(4rem, 10vw, 12.5rem);
  height: clamp(4rem, 10vw, 12.5rem);
  background-color: rgba(255, 169, 0, 0.1943);
  box-shadow: 0 0 14.5rem 14rem rgba(255, 169, 0, 0.2);

  @media ${theme.media.large_tablet} {
    box-shadow: 0 0 12.5rem 12rem rgba(255, 169, 0, 0.2);
  }
  @media ${theme.media.tablet} {
    box-shadow: 0 0 10.5rem 10rem rgba(255, 169, 0, 0.2);
  }
  @media ${theme.media.mobile} {
    box-shadow: 0 0 4.5rem 4.5rem rgba(255, 169, 0, 0.2);
  }
`;
