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
     <BackgroundWrapper>
      <YellowCircle top='70%' left='10%' />
      {children}
      <YellowCircle top='30%' left='80%' />
    </BackgroundWrapper>
    </>
  );
};

export default BackgroundYellowCircle;

const BackgroundWrapper = styled.div`
  position: relative;
  background-color: white; /* Default background color for larger screens */

  @media ${theme.media.tablet} {
    background-color: black; /* Black background on tablet */
  }

  @media ${theme.media.mobile} {
    background-color: black; /* Black background on mobile */
  }
`;

const YellowCircle = styled.div<YellowCircleProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 169, 0, 0.1943);
  box-shadow: 0 0 250px 240px rgba(255, 169, 0, 0.2);

  @media ${theme.media.tablet} {
    display: none; /* Hide yellow circles on tablet */
  }

  @media ${theme.media.mobile} {
    display: none; /* Hide yellow circles on mobile */
  }
`;
