import React from 'react';
import circle from '@/assets/images/PP/circle.png';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { rotateAnimation } from '@/styles/motionAnimation';
import { LiaLongArrowAltDownSolid } from 'react-icons/lia';

const ArrowCircle = () => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Container onClick={handleClick}>
      <RotatingWrapper animate={rotateAnimation}>
        <RotatingImage src={circle} alt='circle' />
      </RotatingWrapper>

      <LabelWrapper>
        <LiaLongArrowAltDownSolid size='50' />
      </LabelWrapper>
    </Container>
  );
};

export default ArrowCircle;

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const LabelWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RotatingWrapper = styled(motion.div)`
  display: inline-block;
`;

const RotatingImage = styled(motion.img)`
  position: relative;
  width: 150px;
`;
