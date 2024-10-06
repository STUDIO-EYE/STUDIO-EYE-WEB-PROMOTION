import React from 'react';
import styled from 'styled-components';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';

const IntroSection: React.FC = () => {
  return (
    <Container>
      <IntroTitleWrapper>
        <IntroLine>
          <IntroNewsWhite>REA</IntroNewsWhite>
          <IntroNewsMovingContainer>
            <IntroNewsMovingDAnimated delay="0s">D</IntroNewsMovingDAnimated>
            <IntroNewsMovingDAnimated delay="0.2s">D</IntroNewsMovingDAnimated>
            <IntroNewsMovingDAnimated delay="0.4s">D</IntroNewsMovingDAnimated>
          </IntroNewsMovingContainer>
          <IntroNewsWhite>THE NEWS</IntroNewsWhite>
        </IntroLine>

        <IntroLine>
          <IntroNewsYellow>AB</IntroNewsYellow>
          <IntroNewsMovingContainer>
            <IntroNewsMovingOAnimated delay="0s">O</IntroNewsMovingOAnimated>
            <IntroNewsMovingOAnimated delay="0.2s">O</IntroNewsMovingOAnimated>
            <IntroNewsMovingOAnimated delay="0.4s">O</IntroNewsMovingOAnimated>
          </IntroNewsMovingContainer>
          <IntroNewsYellowNoMargin>UT STUDIOEYE!</IntroNewsYellowNoMargin>
        </IntroLine>
      </IntroTitleWrapper>
      <BackgroundYellowCircle> </BackgroundYellowCircle>
      </Container>
  );
};

export default IntroSection;

const Container = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  margin-bottom: 50px;
`;

const IntroLine = styled.div`
  display: flex;
  justify-content: center;
`;

const IntroNewsWhite = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: white;
`;

const IntroNewsYellow = styled.span`
  margin-left: 30px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;
`;

const IntroNewsYellowNoMargin = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;
`;

const IntroNewsMovingContainer = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 70px;
`;

interface IntroNewsMovingProps {
  delay: string;
}

const IntroNewsMovingDAnimated = styled.span<IntroNewsMovingProps>`
  font-family: Pretendard;
  font-weight: 50;
  font-size: 96px;
  color: #ffa900;
  position: absolute;
  margin-left: -5px;
  animation: move-diagonal 0.7s ease-in-out infinite alternate;
  animation-delay: ${(props) => props.delay}; 
  
  @keyframes move-diagonal {
    0% {
      transform: translate(-5px, -5px);
    }
    100% {
      transform: translate(5px, 5px);
    }
  }
`;

const IntroNewsMovingOAnimated = styled.span<IntroNewsMovingProps>`
  font-family: Pretendard;
  font-weight: 50;
  font-size: 96px;
  color: #ffffff;
  position: absolute;
  animation: move-horizontal 0.7s ease-in-out infinite alternate;
  animation-delay: ${(props) => props.delay}; 
  
  @keyframes move-horizontal {
    0% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(5px);
    }
  }
`;
