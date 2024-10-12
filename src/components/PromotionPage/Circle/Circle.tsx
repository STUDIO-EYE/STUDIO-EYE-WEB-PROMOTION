import React, { useRef, useState } from 'react';
import circle from '@/assets/images/PP/circle.png';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { rotateAnimation } from '@/styles/motionAnimation';
import useFollowPointer from '@/hooks/useFollowPointer';
import { theme } from '@/styles/theme';

type Props = {
  label: string;
};

const Circle = ({ label }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useFollowPointer(containerRef);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <RotatingWrapper animate={rotateAnimation}>
        <RotatingImage src={circle} alt='circle' />
      </RotatingWrapper>

      <LabelWrapper>{label}</LabelWrapper>
    </Container>
  );
};

export default Circle;

const Container = styled.div`
  position: relative;
  display: inline-block;

  @media ${theme.media.mobile} {
    width: 100%;
  }
`;

const LabelWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'pretendard-bold';
  font-size: 18px;

  @media ${theme.media.mobile} {
    font-size: 0.8rem;
  }
`;

const HoveredLabelWrapper = styled(motion.div)``;
const RotatingWrapper = styled(motion.div)`
  display: inline-block;
`;

const RotatingImage = styled(motion.img)`
  position: relative;

  @media ${theme.media.mobile} {
    width: 10rem;
  }
`;
