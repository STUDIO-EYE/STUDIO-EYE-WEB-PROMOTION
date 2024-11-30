import React from 'react';
import styled from 'styled-components';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';
import { theme } from '@/styles/theme';

interface IIntroTextProps {
  text?: string;
}

const IntroSection: React.FC = () => {
  return (
    <Container>
      <IntroTitleWrapper>
        <IntroLine>
          <MobileWrapper>
            <IntroText>REA</IntroText>
            <AnimatedD>
              <span>D</span>
              <span>D</span>D
            </AnimatedD>
            <IntroText>&nbsp;</IntroText>
            <IntroText>THE NEWS</IntroText>
          </MobileWrapper>
        </IntroLine>
        <IntroLine>
          <MobileWrapper>
            <IntroText>AB</IntroText>
            <AnimatedO>
              <span>O</span>
              <span>O</span>O
            </AnimatedO>
            <IntroText>UT</IntroText>
          </MobileWrapper>
          <IntroText>&nbsp;</IntroText>
          <IntroText text="highlight">STUDIOEYE</IntroText>
          <IntroText>!</IntroText>
        </IntroLine>
      </IntroTitleWrapper>
      <BackgroundYellowCircle> </BackgroundYellowCircle>
    </Container>
  );
};

export default IntroSection;

const IntroText = styled.span<IIntroTextProps>`
  font-family: ${theme.font.bold};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: ${(props) => (props.text === 'highlight' ? '#ffa900' : 'white')};
`;

const AnimatedD = styled.span`
  position: relative;
  font-family: ${theme.font.light};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: #ffa900;

  span {
    position: absolute;
    opacity: 0.8;

    &:nth-child(1) {
      animation: moveLeftD 2s infinite ease-in-out;
    }
    &:nth-child(2) {
      animation: moveRightD 2s infinite ease-in-out;
    }
  }

  @keyframes moveLeftD {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(-1vw, -1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes moveRightD {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(1vw, 1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @media ${theme.media.mobile} {
    font-family: 'pretendard-light';
  }
`;

const AnimatedO = styled.span`
  position: relative;
  font-family: ${theme.font.light};
  font-size: clamp(1.8rem, 5vw, 6.25rem);
  color: #ffa900;

  span {
    position: absolute;
    opacity: 0.8;

    &:nth-child(1) {
      animation: moveLeftO 2s infinite ease-in-out;
    }
    &:nth-child(2) {
      animation: moveRightO 2s infinite ease-in-out;
    }
  }

  @keyframes moveLeftO {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(1vw, -1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @keyframes moveRightO {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    50% {
      opacity: 0.5;
      transform: translate(-1vw, 1vw);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  @media ${theme.media.mobile} {
    font-family: 'pretendard-light';
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${theme.media.tablet}{
    height: 100vh;
    width: 100%;
    align-items: left;
  }
  @media ${theme.media.mobile}{
    height: 60vh;
  }
`;

const IntroTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
  margin-bottom: 50px;

  @media ${theme.media.tablet}{
    align-items:flex-start;
    margin-bottom:0;
  }
`; 

const IntroLine = styled.div`
  display: flex;
  justify-content: center;

  @media ${theme.media.tablet}{
    margin-left: 1rem;
    word-break: keep-all;
  }

`;

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;