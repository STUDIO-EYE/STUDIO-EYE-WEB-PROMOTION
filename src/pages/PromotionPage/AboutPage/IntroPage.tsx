import styled from 'styled-components';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Circle from '../../../components/PromotionPage/Circle/ArrowCircle';
import BackgroundYellowCircle from '@/components/BackgroundYellowCircle/BackgroundYellowCircle';
import MissionLabel from '../../../assets/images/Mission.png';
import { getCompanyData } from '../../../apis/PromotionAdmin/dataEdit';

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
            <AboutText dangerouslySetInnerHTML={{ __html: companyIntroData || "디폴트 데이터 뭐였더라"  }} />
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
                style={{ width: '50%', height: '130px', objectFit: 'contain' }}
              />
            ) : (
              <img src={MissionLabel} alt='MissionLabel' style={{ width: '50%', objectFit: 'contain' }} />
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
`;

const InitContainer = styled.div`
  margin-top: 40px;
  height: 100vh; // 전체 화면 높이
  background-color: black;
  position: relative; // 구형 도형의 위치 지정
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InitTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 70px;
`;
const InitTitle = styled(motion.div)<IFontStyleProps>`
  font-family: 'Pretendard-Bold';
  font-size: 120px;
  color: ${(props) => props.color || '#ffffff'};
`;

const IntroContainer = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;
const BackgroundText = styled.div`
  font-family: 'pretendard-bold';
  font-size: 10vw;
  letter-spacing: 10px;
  opacity: 0.2;
  filter: blur(3px);
  color: '#FFFFFF';
  user-select: none;
`;
const AboutWrapper = styled.div`
  text-align: left;
  margin-bottom: 50px;
`;
const AboutText = styled.div<IFontStyleProps>`
  font-family: 'pretendard-medium';
  font-size: 2vw;
  color: ${(props) => props.color || '#ffffff'};
  margin-bottom: 15px;
  padding: 10px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.5;
`;
const MissionWrapper = styled.div`
  text-align: right;
  margin-bottom: 70px;
`;
