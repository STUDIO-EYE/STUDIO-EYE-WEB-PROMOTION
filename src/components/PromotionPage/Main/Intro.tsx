import { motion, useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Circle from '../Circle/Circle';
import { getCompanyData } from '../../../apis/PromotionAdmin/dataEdit';
import { Link } from 'react-router-dom';
import { theme } from '@/styles/theme';

const Intro = () => {
  const introRef = useRef(null);
  const desRef = useRef(null);
  const circleRef = useRef(null);

  const introInView = useInView(introRef);
  const desInView = useInView(desRef);
  const circleInView = useInView(circleRef);

  const [companyMainOverview, setCompanyMainOverview] = useState<string>('');
  const [companyCommitment, setCompanyCommitment] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyData();
        setCompanyMainOverview(data.mainOverview);
        setCompanyCommitment(data.commitment);
      } catch (error) {
        // console.error('Error fetching company data: ', error);
      }
    };

    fetchData();
  }, []);

  const isMobile = window.innerWidth < 768;

  return (
    <Container data-testid="intro-section">
      <IntroWrapper data-testid="intro_mainOverview" ref={introRef} >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: introInView ? 1 : 0, y: introInView ? 0 : 100 }}
          transition={{ duration: 1, delay: 0.2 }}
          dangerouslySetInnerHTML={{
            __html: companyMainOverview ||
              `<p><span style="color:#ffa900;">STUDIO EYE</span> IS ${isMobile ? '<br />' : ' '} THE <span style="color:#ffa900;">BEST</span>${isMobile ? '<br />' : ' '} NEW MEDIA</p> <p>PRODUCTION ${isMobile ? '<br />' : ' '} BASED ON ${isMobile ? '<br />' : ' '} OTT & YOUTUBE</p>`
          }}
        ></motion.div>
      </IntroWrapper>
      <DesWrapper data-testid="intro_commitment" ref={desRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: desInView ? 1 : 0, y: desInView ? 0 : 100 }}
          transition={{ duration: 2, delay: 0.6 }}
          dangerouslySetInnerHTML={{ __html: companyCommitment || `<p>우리는 급변하는 뉴 미디어 시대를 반영한 콘텐츠 제작을 위해 ${isMobile ? '<br />' : ' '} 끊임없이 고민하고 변화합니다.</p>` }}
        ></motion.div>
      </DesWrapper>
      <CircleWrapper ref={circleRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: circleInView ? 1 : 0, y: circleInView ? 0 : 100 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link to='/about'>
            <Circle label='ABOUT STUDIO EYE' />
          </Link>
        </motion.div>
      </CircleWrapper>
      {/* {isMobile && <BackgroundYellowCircle> </BackgroundYellowCircle>} */}
    </Container>
  );
};
export default Intro;

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  line-height: normal;

  @media ${theme.media.mobile} {
    width: 100%;
    height: 100vh;
  }
`;

const IntroWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 48px;
  text-align: center;

  width: 80rem;
  max-height: 12rem;
  text-overflow: ellipsis;
  overflow: hidden;

  @media ${theme.media.mobile}{
    width: 100%;
    max-height: fit-content;
    font-size: 1.9rem;
    text-align: left;
    padding: 0.75rem;
    margin-top: 5rem;
  }
`;

const DesWrapper = styled.div`
  font-size: 20px;
  font-family: 'pretendard-bold';
  margin-top: 54px;
  text-align: center;

  width: 50rem;
  max-height: 50rem;
  text-overflow: ellipsis;
  overflow: hidden;

  @media ${theme.media.mobile}{
    width: 100%;
    padding: 0.75rem;
    height: fit-content;
    font-size: 0.7rem;
    font-weight: 300;
    text-align: left;
    word-break: keep-all;
    margin-top: 0;
  }
`;

const CircleWrapper = styled(motion.div)`
  margin-top: 102px;

  @media ${theme.media.mobile}{
    margin: 4rem;
  }
`;
