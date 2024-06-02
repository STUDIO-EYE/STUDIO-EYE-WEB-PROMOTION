import { motion, useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Circle from '../Circle/Circle';
import { getCompanyData } from '../../../apis/PromotionAdmin/dataEdit';
import { Link } from 'react-router-dom';

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

        const commitmentText = data.commitment.replace(/<\/?[^>]+(>|$)/g, '');
        setCompanyCommitment(commitmentText);
      } catch (error) {
        console.error('Error fetching company data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <IntroWrapper ref={introRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: introInView ? 1 : 0, y: introInView ? 0 : 100 }}
          transition={{ duration: 1, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: companyMainOverview || '<p>데이터 없음</p>' }}
        ></motion.div>
      </IntroWrapper>
      <DesWrapper ref={desRef}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: desInView ? 1 : 0, y: desInView ? 0 : 100 }}
          transition={{ duration: 2, delay: 0.6 }}
        >
          {companyCommitment || '데이터 없음'}
        </motion.div>
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
`;
const IntroWrapper = styled.div`
  font-family: 'pretendard-bold';
  font-size: 48px;
  text-align: center;
`;
const DesWrapper = styled.div`
  font-size: 20px;
  font-family: 'pretendard-bold';
  margin-top: 54px;
`;
const CircleWrapper = styled(motion.div)`
  margin-top: 102px;
`;
