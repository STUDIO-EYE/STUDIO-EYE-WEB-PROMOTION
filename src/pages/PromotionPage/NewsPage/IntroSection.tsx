import React from 'react';
import styled from 'styled-components';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';
import { theme } from '@/styles/theme';

const IntroSection: React.FC = () => {
  return (
    <Container>
      <IntroTitleWrapper>
        <IntroLine>
          <MobileWrapper>
          <IntroNewsWhite>REA</IntroNewsWhite>
          <IntroNewsMovingContainer>
            <IntroNewsMovingDAnimated delay="0s">D</IntroNewsMovingDAnimated>
            <IntroNewsMovingDAnimated delay="0.2s">D</IntroNewsMovingDAnimated>
            <IntroNewsMovingDAnimated delay="0.4s">D</IntroNewsMovingDAnimated>
          </IntroNewsMovingContainer>
          </MobileWrapper>
          <IntroNewsWhite>THE NEWS</IntroNewsWhite>
        </IntroLine>

        <IntroLine>
        <MobileWrapper>
          <IntroNewsYellow>AB</IntroNewsYellow>
          <IntroNewsMovingContainer>
            <IntroNewsMovingOAnimated delay="0s">O</IntroNewsMovingOAnimated>
            <IntroNewsMovingOAnimated delay="0.2s">O</IntroNewsMovingOAnimated>
            <IntroNewsMovingOAnimated delay="0.4s">O</IntroNewsMovingOAnimated>
          </IntroNewsMovingContainer>
          <IntroNewsYellowNoMargin>UT</IntroNewsYellowNoMargin>
          </MobileWrapper>
          <IntroNewsYellowMargin>STUDIOEYE!</IntroNewsYellowMargin>
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
    flex-direction:column;
    margin-left: 1rem;
  }
`;

const IntroNewsWhite = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: white;

  @media ${theme.media.tablet}{
    font-size: 6rem;
  }
  @media ${theme.media.mobile}{
    font-size: 3rem;
  }
`;

const IntroNewsYellow = styled.span`
  margin-left: 30px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;

  @media ${theme.media.tablet}{
    font-size: 6rem;
    margin-left:0px;
  }
  @media ${theme.media.mobile}{
    font-size: 3rem;
  }
`;

const IntroNewsYellowNoMargin = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;
  margin-left:25px;

  @media ${theme.media.tablet}{
    font-size: 6rem;
    margin-left: 0.2rem;
  }
  @media ${theme.media.mobile}{
    font-size: 3rem;
    margin-left: -1.9rem;
  }
`;
const IntroNewsYellowMargin = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 96px;
  color: #ffa900;
  margin-left:25px;

  @media ${theme.media.tablet}{
    font-size: 6rem;
    margin-left: 0;
  }
  @media ${theme.media.mobile}{
    font-size: 3rem;
    margin-left: 0;
  }
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

  @media ${theme.media.tablet}{
    font-size: 6rem;
    margin-left: 0px;

    @keyframes move-diagonal {
      0% {
        transform: translate(-2px, -2px);
      }
      100% {
        transform: translate(2px, 2px);
      }
    }
  }

  @media ${theme.media.mobile}{
    font-size: 3rem;
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
  animation-delay: ${(props) => props.delay}; 
  margin-left:0.8rem;
  animation-delay: ${(props) => props.delay};
  margin-left:0.8rem;
  
  @keyframes move-horizontal {
    0% {
      transform: translateX(-6px);
    }
    100% {
      transform: translateX(6px);
    }
  }

  @media ${theme.media.tablet}{
    font-size: 6rem;
    margin-left:0.2rem;

    @keyframes move-horizontal {
      0% {
        transform: translateX(-3px);
      }
      100% {
        transform: translateX(3px);
      }
    }
  }

  @media ${theme.media.mobile}{
    font-size: 3rem;
  }
`;

const MobileWrapper=styled.div`
display:flex;
flex-direction:row;
`