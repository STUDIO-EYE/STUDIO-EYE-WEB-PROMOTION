import { motion, useInView } from 'framer-motion';
import React, { lazy, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Circle from '../Circle/Circle';
import { getCompanyData } from '../../../apis/PromotionAdmin/dataEdit';
import { Link } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { INTRO_DATA } from '@/constants/introdutionConstants';

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
    <Container data-cy="intro-section">
      <IntroWrapper data-cy="intro_mainOverview" ref={introRef} >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: introInView ? 1 : 0, y: introInView ? 0 : 100 }}
          transition={{ duration: 1, delay: 0.2 }}
          dangerouslySetInnerHTML={{
            __html: companyMainOverview || INTRO_DATA.MAIN_OVERVIEW
          }}
        ></motion.div>
      </IntroWrapper>
      <DesWrapper data-cy="intro_commitment" ref={desRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: desInView ? 1 : 0, y: desInView ? 0 : 100 }}
          transition={{ duration: 2, delay: 0.6 }}
          dangerouslySetInnerHTML={{ __html: companyCommitment || INTRO_DATA.COMMITMENT }}
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
  word-break: keep-all;

  line-height: normal;

  @media ${theme.media.mobile} {
    height: 100dvh;
  }

  @supports (-webkit-touch-callout: none) {
    .modal { /* 넘어가지 않는 요소에 사용 */
        height: -webkit-fill-available;
    }
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

  @media ${theme.media.tablet} {
    padding: 0 2rem;
    max-width: 45rem;
  }

  @media ${theme.media.mobile}{
    width: 80%;
    max-height: fit-content;
    font-size: 1.9rem;
    text-align: center;
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
  
@media ${theme.media.tablet} {
    padding: 0 2rem;
    max-width: 50rem;
  }
  @media ${theme.media.mobile}{
    width: 90%;
    padding: 0.75rem;
    height: fit-content;
    font-size: 0.9rem;
    font-weight: 300;
    text-align: center;
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
