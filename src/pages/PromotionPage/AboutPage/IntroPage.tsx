import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Circle from '../../../components/PromotionPage/Circle/ArrowCircle';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';
import MissionLabel from '../../../assets/images/Mission.png';
import { getCompanyData } from '../../../apis/PromotionAdmin/dataEdit';
import { theme } from '@/styles/theme';
import { useMediaQuery } from 'react-responsive';

interface IFontStyleProps {
  color?: string;
}

const bounceAnimation = {
  hidden: { opacity: 0, y: 0 },
  visible: (turn: number) => ({
    opacity: 1,
    y: [0, -30, 0, -7, 0], // 두 번 튕기는 형태
    transition: {
      delay: turn * 0.5, // 0.5초 간격으로 지연
      duration: 0.8, // 총 1초 동안
    },
  }),
};

function IntroPage() {
  const isMobile = useMediaQuery({ query: `(max-width: ${theme.mediaSize.mobile}px)` });
  const aboutRef = useRef(null);
  const missionRef = useRef(null);

  const aboutInView = useInView(aboutRef);
  const missionInView = useInView(missionRef);

  const [companyIntroData, setCompanyIntroData] = useState('');
  const [sloganImageUrl, setSloganImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData();
        setCompanyIntroData(data.introduction);
        setSloganImageUrl(data.sloganImageUrl);
      } catch (error) {
        console.error('Error fetching company data: ', error);
      }
    };

    fetchData();
  }, []);

  const removeParagraphTags = (htmlString: string) => {
    return htmlString
      .replace(/<\/?p\s*\/?>/gi, '') // <p> 태그를 제거
      .replace(/<\/?br\s*\/?>/gi, ' '); // <br> 태그를 공백으로 대체
  };

  return (
    <Container>
      <InitContainer>
        <div>
          <InitTitleWrapper>
            <InitTitle custom={0} initial='hidden' animate='visible' variants={bounceAnimation}>
              WHAT
            </InitTitle>
            <InitTitle custom={1} initial='hidden' animate='visible' variants={bounceAnimation} color='#ffa900'>
              WE
            </InitTitle>
            <InitTitle custom={2} initial='hidden' animate='visible' variants={bounceAnimation}>
              DO
            </InitTitle>
          </InitTitleWrapper>
        </div>
        <Circle />
        <BackgroundYellowCircle> </BackgroundYellowCircle>
      </InitContainer>

      <IntroContainer>
        <AboutWrapper ref={aboutRef}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 100 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <BackgroundText>ABOUT</BackgroundText>
            <AboutText
              dangerouslySetInnerHTML={{
                __html: isMobile
                  ? removeParagraphTags(
                      companyIntroData ||
                        '<p>2010년에 설립된 스튜디오 아이는 다양한 장르를 소화할 수 있는 PD들이 모여</p><p><span style="color: rgb(255, 138, 8);">클라이언트 맞춤형 콘텐츠 제작</span><span style="color: rgb(251, 251, 251);">과</span><span style="color: rgb(255, 138, 8);"> 운영 대책 서비스</span><span style="color: rgb(251, 251, 251);">를 제공하고 있으며</span></p><p>드라마 애니메이션 등을 전문으로 하는 여러 계열사들과도 협력하고 있습니다.</p>',
                    )
                  : companyIntroData ||
                    '<p>2010년에 설립된 스튜디오 아이는 다양한 장르를 소화할 수 있는 PD들이 모여</p><p><span style="color: rgb(255, 138, 8);">클라이언트 맞춤형 콘텐츠 제작</span><span style="color: rgb(251, 251, 251);">과</span><span style="color: rgb(255, 138, 8);"> 운영 대책 서비스</span><span style="color: rgb(251, 251, 251);">를 제공하고 있으며</span></p><p>드라마 애니메이션 등을 전문으로 하는 여러 계열사들과도 협력하고 있습니다.</p>',
              }}
            />
          </motion.div>
        </AboutWrapper>
        <MissionWrapper ref={missionRef}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: missionInView ? 1 : 0, y: missionInView ? 0 : 100 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <BackgroundText> MISSION</BackgroundText>
            {sloganImageUrl !== '' ? (
              <img
                src={sloganImageUrl}
                alt='SloganLabel'
                style={
                  isMobile
                    ? { width: '80%', height: '6rem', objectFit: 'contain' }
                    : { width: '50%', height: '8.125rem', objectFit: 'contain' }
                }
              />
            ) : (
              <img
                src={MissionLabel}
                alt='MissionLabel'
                style={isMobile ? { width: '80%', objectFit: 'contain' } : { width: '50%', objectFit: 'contain' }}
              />
            )}
          </motion.div>
        </MissionWrapper>
      </IntroContainer>
    </Container>
  );
}

export default IntroPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 210vh;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-bottom: 100px;
  @media ${theme.media.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const InitContainer = styled.div`
  margin-top: 2.5rem;
  height: 100vh;
  background-color: ${theme.color.background};
  position: relative; // 구형 도형의 위치 지정
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InitTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  margin-bottom: 4.375rem;
  @media ${theme.media.mobile} {
    gap: 0.5rem;
  }
`;
const InitTitle = styled(motion.div)<IFontStyleProps>`
  font-family: ${theme.font.bold};
  font-size: clamp(2.75rem, 8vw, 7.5rem);
  color: ${(props) => props.color || theme.color.white.light};
`;

const IntroContainer = styled.div`
  height: 100vh;
  background-color: ${theme.color.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem;
  @media ${theme.media.mobile} {
    width: 90%;
    margin: 0;
    padding: 0;
  }
`;
const BackgroundText = styled.div`
  font-family: ${theme.font.bold};
  font-size: clamp(3.5rem, 10vw, 12rem);
  letter-spacing: 0.625rem;
  opacity: 0.2;
  filter: blur(3px);
  color: '#FFFFFF';
  user-select: none;
  @media ${theme.media.mobile} {
    font-family: ${theme.font.thin};
  }
`;
const AboutWrapper = styled.div`
  text-align: left;
  margin-bottom: 3.125rem;
  @media ${theme.media.mobile} {
    text-align: center;
    margin-bottom: 2rem;
  }
`;
const AboutText = styled.div<IFontStyleProps>`
  font-family: ${theme.font.medium};
  font-size: 2vw;
  color: ${(props) => props.color || theme.color.white.light};
  margin-bottom: 15px;
  padding: 10px;
  max-width: 80%;
  word-break: keep-all;
  white-space: normal;
  line-height: 1.5;
  @media ${theme.media.mobile} {
    font-size: 1rem;
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
`;
const MissionWrapper = styled.div`
  text-align: right;
  margin-bottom: 70px;
  @media ${theme.media.mobile} {
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;
